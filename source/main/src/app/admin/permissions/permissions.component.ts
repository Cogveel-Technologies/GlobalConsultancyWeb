import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';
import { ConsultancyApi } from 'app/consultancy/consultancy-services/api.service'
import { MyDialogComponentComponent } from '../my-dialog-component/my-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';


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
  allRoles: Observable<any>;  // Add this observable to store all roles data
  rolesList = ["Admin", "Consultancy"];
  roles = new FormControl('all');
  currentPageIndex: number = 0;
  records: number;
  roleSelected = false;
  dataLoaded = new BehaviorSubject<boolean>(false); 
  isDataLoaded = false;
  search$:BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscription:Subscription = new Subscription();
  editedRowIndex:number|null = null;
  



  defaultData = this.consultancyService.defaultRenderData();
  pagination$ = new BehaviorSubject<{ pageSize?: number, pageIndex?: number, search?: boolean }>({
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
    private dialog:MatDialog
  ) {}

 
ngOnInit(): void {
  this.permissionsForm = new FormGroup({
    modules: new FormArray([]),
  });
  this.allRoles = this.adminService.getAllRoles()

 
  this.subscription.add(
    this.adminService
      .getPermissions(this.defaultData)
      .pipe(
        map((res) => {
          this.records = res['pageInfo'].totalRecords;
          return res['data']; // Extract the array of roles or permissions
        }),
        tap((roles) => {
          console.log(roles)
          // Push each role/permission into the FormArray
          const modulesArray = this.permissionsForm.get('modules') as FormArray;
          roles.forEach((role: any) => {
            console.log
            const roleFormGroup = new FormGroup({
              id: new FormControl(role.id),
              subMenuId: new FormControl(role.subMenuId || null), // Populate fields as necessary
              roleId: new FormControl(role.roleId || ''),
              canAdd: new FormControl(role.canAdd),
              canEdit: new FormControl(role.canEdit),
              canDelete: new FormControl(role.canDelete),
              canView: new FormControl(role.canView),
            });
            modulesArray.push(roleFormGroup); // Add to FormArray
          });
        })
      )
      .subscribe(() => {
        console.log(this.permissionsForm.value); // Form is updated
      })
  );
  
}



  // Create form group for permissions per role
  

  onRoleChange(value: any): void {
    this.defaultData.roleId = value;
    this.roleSelected = typeof value === 'number';
  }

  onPageChange(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex;
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1 });
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
      // Exit edit mode and save changes
      this.editedRowIndex = null; // Immediately toggle back to default state
      console.log('Exiting edit mode for row:', rowIndex);
  
      // Proceed with saving changes asynchronously
      this.adminService.updatePermission(data).subscribe(
        (res) => {
          console.log('Permission updated successfully:', res);
          // No further action needed; UI already toggled
        },
        (err) => {
          console.error('Error updating permission:', err);
          // Handle error: Optionally re-enable edit mode
          this.editedRowIndex = rowIndex; // Revert UI state to edit mode if needed
        }
      );
    } else {
      // Enter edit mode for the clicked row
      this.editedRowIndex = rowIndex;
      console.log('Editing row:', rowIndex);
    }
  }
  

  onCancelEdit(){
    this.editedRowIndex = null;
  }

  onSearch(){

  }

  onSubmit(){}

  openDialog():void{
    this.adminService.sendRoleId.next(+this.defaultData.roleId)
    this.dialog.open(MyDialogComponentComponent, {
      width: '400px', // Optional: Adjust width
      disableClose: false, // Optional: Close when clicking outside
      data: { message: 'This is a message passed to the dialog' } // Optional: Pass data
    });
  }

 
}
