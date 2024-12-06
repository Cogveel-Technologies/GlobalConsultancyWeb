import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../admin.service';
import { el } from '@fullcalendar/core/internal-common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-my-dialog-component',
  templateUrl: './my-dialog-component.component.html',
  styleUrls: ['./my-dialog-component.component.scss']
})
export class MyDialogComponentComponent {
  assignPermissionForm: FormGroup;
  roleId: number;
  menu: any;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject data passed to the dialog
  ) {
    // Initialize the form
    this.assignPermissionForm = this.fb.group({
      permissions: this.fb.array([]) // Initialize as an empty FormArray
    });

  }

  ngOnInit() {
    this.adminService.sendRoleId.subscribe(res => this.roleId = res)
    this.adminService.getSubmenu().pipe(map(res => res['data'])).subscribe(res => {
      // console.log(res)
      res.map(el => {
        const permissionGroup = this.fb.group({
          name: [el.name],
          subMenuId: [el.subMenuId],
          canAdd: [false],
          canEdit: [false],
          canDelete: [false],
          canView: [false]
        });
        // Add the newly created permission group to the FormArray
        (this.assignPermissionForm.get('permissions') as FormArray).push(permissionGroup);
      })
    });
  }

  // Getter for permissions FormArray
  get permissions(): FormArray {
    return this.assignPermissionForm.get('permissions') as FormArray;
  }

  onSubmit() {
    if (this.assignPermissionForm.valid) {
      let permissions = this.assignPermissionForm.value.permissions
      permissions = permissions.filter(el=> el.canAdd === true || el.canEdit === true|| el.canView === true|| el.canDelete === true).map(el => {
        return { ...el, roleId: this.roleId }
      })
      console.log(permissions)
      this.adminService.addPermissions(permissions).subscribe(res => console.log(res))
    } else {
      console.log('Form is invalid');
    }
  }
}
