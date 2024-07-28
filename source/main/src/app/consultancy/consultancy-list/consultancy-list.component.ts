import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyData } from '../consultancy-models/data.consultancy';
import { Observable } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';


@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.scss']
})
export class ConsultancyListComponent implements OnInit {

  breadscrums = [
    {
      title: 'Consultancy List',
      items: ['Consultancy'],
      active: 'Consultancy List',
    },
  ];

  constructor(private router: Router, private route:ActivatedRoute, private consultancyService:ConsultancyService, private consultancyApiService:ConsultancyApi) { }
  editMode:boolean
  consultancies!:Observable<ConsultancyData[]>;
  pageSize = 5;
  currentPage = 1;
  defaultData:ConsultancyDetailsOptions;
  searchText:string;

  ngOnInit() { 
    // RETREIVE CONSULTANCY DATA
    this.defaultData = this.consultancyService.defaultRenderData()
    //  if(this.defaultData.searchText === ''){
    //   this.consultancies = this.consultancyApiService.getConsultancy(this.defaultData)
    // }
    this.consultancies = this.consultancyApiService.getConsultancy(this.defaultData)
  }

  addInstitute() {
    this.router.navigate(['consultancy/register-consultancy'])
  }

  refreshPage() {
    console.log("Refresh button clicked");
  }

  deleteConsultancy(id: number) {
    const con =  confirm("Are you sure?")
    if(con){
      this.consultancyApiService.deleteConsultancy(id).subscribe(res=> {
        this.consultancies = this.consultancyApiService.getConsultancy(this.defaultData)
        alert("Deleted Successfully")
      });
    }
  }

  onPageChange($event){
    this.pageSize = $event.pageSize;
    const paginatedData = {...this.defaultData};
    paginatedData.limit = this.pageSize;
    this.consultancies = this.consultancyApiService.getConsultancy(paginatedData)
  }

  onSearch($event){
    this.searchText = $event.target.value;
    const searchData = {...this.defaultData};
    searchData.searchText = this.searchText;
    this.consultancies = this.consultancyApiService.getConsultancy(searchData)
  }

  viewDetails(){
   
  }  
}
