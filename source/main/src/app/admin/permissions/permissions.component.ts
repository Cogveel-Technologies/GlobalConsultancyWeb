import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of, Subscription } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';
import { ConsultancyApi } from 'app/consultancy/consultancy-services/api.service'
import { MyDialogComponentComponent } from '../my-dialog-component/my-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  breadscrums = [
    { title: 'Permissions', items: ['Superadmin'], active: 'Permissions' },
  ];

  permissionsForm: FormGroup;
  roleOptions: Observable<any>;
  allRoles: Observable<any>|any;  // Add this observable to store all roles data
  rolesList = ["Admin", "Consultancy"];
  roles = new FormControl('all');
  currentPageIndex: number;
  records: number;
  roleSelected = false;
  dataLoaded = new BehaviorSubject<boolean>(false);
  isDataLoaded = false;
  search$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscription: Subscription = new Subscription();
  editedRowIndex: number | null = null;
  modulesArray: any
  update$: BehaviorSubject<boolean> = new BehaviorSubject(false)
  roleId$: BehaviorSubject<number|null> = new BehaviorSubject(null)
  roleId:number




  defaultData = this.consultancyService.defaultRenderData();
  pagination$ = new BehaviorSubject<{ pageSize?: number, pageIndex?: number, search?: boolean, roleId?:number }>({
    pageSize: this.defaultData.pageSize,
    pageIndex: this.defaultData.currentPage,
    search: true
  });
  sorting$ = new BehaviorSubject<{ field: string, direction: string }>({
    field: this.defaultData.OrderBy,
    direction: this.defaultData.sortExpression
  });

  constructor(
    private adminService: AdminService,
    private consultancyService: ConsultancyService,
    private consultancyApiService: ConsultancyApi,
    private dialog: MatDialog,
    private cdr:ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.adminService.updatePermissions.subscribe(res => this.update$.next(true))
    this.permissionsForm = new FormGroup({
      modules: new FormArray([]),
    });
    this.adminService.getAllRoles().subscribe(res=> {
      console.log(res)
      this.allRoles = res
    } )
    this.modulesArray = this.permissionsForm.get('modules') as FormArray;


    combineLatest([this.pagination$, this.update$]).pipe(
      switchMap(([pageRelated]) => {
        if(this.roleSelected){
          console.log(pageRelated)
          console.log("PPPPPPPP")
          this.cdr.detectChanges()
          this.defaultData.roleId = pageRelated.roleId
        }
        this.defaultData.pageSize = pageRelated.pageSize;
        this.defaultData.currentPage = pageRelated.pageIndex;
        console.log(this.defaultData);
        return this.adminService.getPermissions(this.defaultData).pipe(
          tap((res) => {
            this.records = res['pageInfo'].totalRecords;
            this.modulesArray.clear(); // Clear the FormArray before adding new data
            res['data'].forEach((role: any) => {
              const roleFormGroup = new FormGroup({
                id: new FormControl(role.id),
                subMenuId: new FormControl(role.subMenuId || null),
                subMenuName: new FormControl(role.subMenuName),
                roleId: new FormControl(role.roleId || ''),
                canAdd: new FormControl(role.canAdd),
                canEdit: new FormControl(role.canEdit),
                canDelete: new FormControl(role.canDelete),
                canView: new FormControl(role.canView),
              });
              this.modulesArray.push(roleFormGroup); // Add to FormArray
            });
          }),
          map((res) => res['data']) // Emit only the data array if needed
        );
      })
    ).subscribe(res=>console.log(this.modulesArray));


  }



  // Create form group for permissions per role


  onRoleChange(value: any): void {
    this.currentPageIndex = 0;
    this.roleSelected = true;
    this.roleId$.next(value)
    this.roleId = value
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, roleId:value })
  }

  onPageChange(event: PageEvent): void {
    console.log(event)
    this.currentPageIndex = event.pageIndex;
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1, roleId:this.roleId });
  }

  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }): void {
    this.sorting$.next({ field, direction });
  }

  get modules(): FormArray {
    return this.permissionsForm.get('modules') as FormArray;
  }

  onEdit(data: any, rowIndex: number): void {
    if (this.editedRowIndex === rowIndex) {
      console.log(data)
      this.editedRowIndex = null;
      console.log('Exiting edit mode for row:', rowIndex);

      this.adminService.updatePermission(data).subscribe(
        (res) => {
          console.log('Permission updated successfully:', res);
        },
        (err) => {
          console.error('Error updating permission:', err);
          this.editedRowIndex = rowIndex;
        }
      );
    } else {
      this.editedRowIndex = rowIndex;
      console.log('Editing row:', rowIndex);
    }
  }


  onCancelEdit() {
    this.editedRowIndex = null;
  }

  onSearch() {

  }

  onSubmit() { }

  openDialog(): void {
    this.adminService.sendRoleId.next(+this.defaultData.roleId)
    this.dialog.open(MyDialogComponentComponent, {
      width: '400px', // Optional: Adjust width
      disableClose: false, // Optional: Close when clicking outside
      data: { message: 'This is a message passed to the dialog' } // Optional: Pass data
    });
  }

  onDelete(id:number){
    const con = confirm("Are you sure?");
    if(con){
      this.adminService.deletePermission(id).subscribe(res =>{
        this.adminService.getPermissions(this.defaultData)
        const indexToRemove = this.permissionsForm.get('modules')?.value.findIndex((module: any) => module.id === id);
        if (indexToRemove !== -1) {
          (this.permissionsForm.get('modules') as FormArray).removeAt(indexToRemove);
          this.update$.next(true)
        }
      })
    }
  }


}
