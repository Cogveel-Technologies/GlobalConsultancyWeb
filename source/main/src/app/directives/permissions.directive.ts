import { Directive, Input } from '@angular/core';
import { PermissionsService } from 'app/general-services/permissions.service';

@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective {

  constructor(private permissionService:PermissionsService) { }
  @Input() set appPermissions({action}){
    console.log("TTTTT")
    const permissions = this.permissionService.getPermissions();
    const hasPermission = permissions.find(el=> el[action] === true);
    console.log(hasPermission)
  }
}
