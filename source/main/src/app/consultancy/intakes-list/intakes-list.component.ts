import { Component, OnInit } from '@angular/core';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';

@Component({
  selector: 'app-intakes-list',
  templateUrl: './intakes-list.component.html',
  styleUrls: ['./intakes-list.component.scss']
})
export class IntakesListComponent {
  breadscrums = [
    {
      title: 'Intake List',
      items: ['Consultancy'],
      active: 'Intake List',
    },
  ];
  constructor( private consultancyApiService:ConsultancyApi, private consultancyService:ConsultancyService){}
  intakes!:any
  defaultData:ConsultancyDetailsOptions
  pageSize = 5;


  // get all data
  ngOnInit(){
    this.defaultData = this.consultancyService.defaultRenderData();
    this.intakes = this.consultancyApiService.getIntakes(this.defaultData);
  }

  addProgram(){}

  deleteIntake(id:number){
    const con =  confirm("Are you sure?")
    if(con){
      this.consultancyApiService.deleteIntake(id).subscribe(res=> {
        alert("Deleted Successfully")
        this.intakes = this.consultancyApiService.getIntakes(this.defaultData)
      });
    }
  }

  onPageChange($event){
    this.pageSize = $event.pageSize;
    const paginatedData = {...this.defaultData};
    paginatedData.limit = this.pageSize;
    this.intakes = this.consultancyApiService.getIntakes(paginatedData)
  }

}
