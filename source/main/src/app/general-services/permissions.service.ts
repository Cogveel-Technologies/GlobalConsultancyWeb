import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() { }

  permissions: any[];

  setPermissions(permission:any){
    this.permissions = permission;
  }

  getPermissions(){
    return this.permissions
  }
}
