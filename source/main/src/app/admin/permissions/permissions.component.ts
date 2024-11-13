import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AdminService } from '../admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';
import { ConsultancyApi } from 'app/consultancy/consultancy-services/api.service';


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
  ) {}

 
ngOnInit(): void {
  this.permissionsForm = new FormGroup({
    modules: new FormArray([]),
  });

  this.allRoles = this.adminService.getAllRoles()

  this.subscription.add(this.consultancyApiService.getRoless(this.defaultData).pipe(
    map((res) => {
      this.records = res['pageInfo'].totalRecords;
      return res['data'];
    }),
    tap((roles) => {
      console.log(roles)
      const modulesArray = roles.map((role) =>
        this.createPermission(role.roleName, role.id)
      );
      this.permissionsForm.setControl('modules', new FormArray(modulesArray));
      this.isDataLoaded = true; 
    })
  ).subscribe());
  
}
createPermission(roleName: string, roleId:number): FormGroup {
  return new FormGroup({
    id: new FormControl(roleId),
    moduleName: new FormControl(roleName),
    add: new FormControl(false),   
    edit: new FormControl(false),  
    delete: new FormControl(false),
    view: new FormControl(false), 
  })
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

  onSearch(){

  }

  onSubmitPermissions(): void {
    const formData = this.permissionsForm.value;
    console.log(this.permissionsForm.value['modules'])
    formData.roleId = this.defaultData.roleId;
    console.log(formData);
  }
}
