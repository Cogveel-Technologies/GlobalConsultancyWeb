import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramData } from '../consultancy-models/data.program';
import { ProgramService } from '../consultancy-services/program.service';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { Observable } from 'rxjs';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';


@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
  
  breadscrums = [
    {
      title: 'Program List',
      items: ['Programs'],
      active: 'Program List',
    },
  ];

  constructor(private router: Router, private route:ActivatedRoute, private programService:ProgramService, private consultancyApiService:ConsultancyApi, private consultancyService:ConsultancyService) { }
  editMode:boolean;
  programs!:Observable<ProgramData[]>;
  defaultData:ConsultancyDetailsOptions;


  ngOnInit() { 
    // call get api here to show default list of program data
    this.defaultData = this.consultancyService.defaultRenderData()
    this.programs = this.consultancyApiService.getPrograms(this.defaultData)
  }

  addProgram() {
    this.router.navigate(['consultancy/register-program'])
  }

  refreshPage() {
    console.log("Refresh button clicked");
    // Add your refresh logic here
  }

  deleteProgram(id: number) {
     this.consultancyApiService.deleteProgram(id).subscribe(res => {
      this.programs = this.consultancyApiService.getPrograms(this.defaultData)
      alert("Deleted Successfully");
    })
  }



  editConsultancy(userId: number) {
    this.router.navigate(['consultancy/register-consultancy'],{queryParams:{editMode:true}})
    

  }

 
}
