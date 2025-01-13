import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { ConsultancyDetailsOptions } from 'app/consultancy/consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { AdminService } from 'app/admin/admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dropdownlist',
  templateUrl: './dropdownlist.component.html',
  styleUrls: ['./dropdownlist.component.scss']
})
export class DropdownlistComponent {
  breadscrums = [
    {
      title: 'Dropdown',
      items: ['SuperAdmin'],
      active: 'Dropdown',
    },
  ];
  constructor(private consultancyService: ConsultancyService, private router: Router, private adminService: AdminService){}
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  dropDownSelected:boolean = false;
  dropDownValues:any[] = [];
  dropDownId:BehaviorSubject<number|null> = new BehaviorSubject<number>(null);
  previousDropDownId:number|null = null;
  dropDownList$: Observable<any>;
  currentPageIndex:number;
  records:number;
  pagination$: BehaviorSubject<{ pageSize?: number, pageIndex?: number }> = new BehaviorSubject<{ pageSize?: number, pageIndex?: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage });
  isData:boolean = false;

  ngOnInit(){
   this.adminService.getAllDropDownCategories().pipe(
      map((res:any)=>res.data)
    ).subscribe((res:any)=>{
      this.dropDownValues = res;
    })


    this.dropDownList$ = combineLatest([this.dropDownId, this.pagination$]).pipe(
      switchMap(([dropDownId, pagination])=>{

        console.log(dropDownId)
        // if there is only pagination without changing dropdown value
        if(pagination){
          this.defaultData.pageSize = pagination.pageSize;
          this.defaultData.currentPage = pagination.pageIndex;
        }

        // if there is only dropdown value change (resetting pagination as well)
        if(dropDownId && dropDownId !== this.previousDropDownId){
          console.log(dropDownId)
          this.defaultData.pageSize = pagination.pageSize;
          this.defaultData.currentPage = pagination.pageIndex;
          this.previousDropDownId = dropDownId;
          this.defaultData.dropDownListName = dropDownId;
          
        }

        console.log(this.defaultData)
        return this.adminService.getDropdownValues(this.defaultData).pipe(
          map((res:any)=>{
            this.isData = true;
            return res.data
          })
        )
      })
    )
  }

  onAddDropdown(){
    this.router.navigate(['/admin/add-dropdown-values']);
  }

    // page event
    onPageChange(event: PageEvent) {
      this.currentPageIndex = event.pageIndex;
      this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: event.pageIndex + 1})
    
    }

  onDropDownSelected(event:any){
    this.dropDownSelected = true;
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1})
    this.dropDownId.next(event);
  }
}
