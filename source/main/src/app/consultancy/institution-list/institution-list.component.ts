import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteService } from '../consultancy-services/institute.service';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from '../consultancy-services/consultancy.service';


@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})

export class InstitutionListComponent {
 
  breadscrums = [
    {
      title: 'Institution List',
      items: ['Consultancy'],
      active: 'Institution List',
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute, private instituteService: InstituteService, private consultancyService:ConsultancyService,private consultancyApiService:ConsultancyApi) { }
  editMode: boolean
  institutes: any;
  pageSize = 5;
  currentPage = 1;
  defaultData:ConsultancyDetailsOptions




  ngOnInit() {
    this.defaultData = this.consultancyService.defaultRenderData()
    this.institutes = this.consultancyApiService.getInstitutes(this.defaultData);
  }

  addInstitute() {
    this.router.navigate(['consultancy/register-consultancy'])
  }

  deleteInstitute(id:number){
    const con =  confirm("Are you sure?")
    if(con){
      this.consultancyApiService.deleteInstitute(id).subscribe(res=> {
        this.institutes = this.consultancyApiService.getInstitutes(this.defaultData)
        alert("Deleted Successfully")
      });
    }
  }

  

 

  refreshPage() {
    console.log("Refresh button clicked");
    // Add your refresh logic here
  }

  deleteUser(userId: number) {
    console.log(`Delete user button clicked for user ${userId}`);
    // Add your delete logic here
  }


  editConsultancy(userId: number) {
    this.router.navigate(['consultancy/register-consultancy'], { queryParams: { editMode: true } })


  }
  onPageChange($event){
    this.pageSize = $event.pageSize;
    const paginatedData = {...this.defaultData};
    paginatedData.limit = this.pageSize;
    this.institutes = this.consultancyApiService.getInstitutes(paginatedData)
  }

}