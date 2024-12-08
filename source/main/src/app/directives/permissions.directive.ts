import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({
  selector: '[appPermissions]'
})
export class PermissionsDirective {
  hasPermission:any
  constructor(private templateRef:TemplateRef<any>,private viewContainer:ViewContainerRef) { }
  @Input() set appPermissions({feature,action}){
    console.log(feature,action , "---------------------")
    console.log(this.templateRef)
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');

    permissions.find(el=> {
      console.log(feature)
      return this.hasPermission = el.subMenuName  === feature && el[action] === true
    });
    if(this.hasPermission){
      console.log(this.hasPermission)
      console.log('hasPermisson')
      this.viewContainer.createEmbeddedView(this.templateRef)
    }else{
      console.log("does not have")
      this.viewContainer.remove()
    }

  }
}
