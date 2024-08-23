import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramData } from '../consultancy-models/data.program';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { map, Observable, tap } from 'rxjs';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { SpecificInstitutes } from '../consultancy-models/data.specificInstitutes';
import { FormControl, FormGroup } from '@angular/forms';


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

  constructor(private router: Router, private consultancyApiService:ConsultancyApi) { }
  editMode:boolean;
  programs!:Observable<ProgramData[]>;
  defaultData:ConsultancyDetailsOptions;
  consultancyId:string = localStorage.getItem("id");
  selectedInstitute:boolean=false;
  institutes:Observable<string[]>;
  instituteForm:FormGroup


  ngOnInit() { 
    this.instituteForm = new FormGroup({
      instituteList: new FormControl(),
    })

   this.institutes = this.consultancyApiService.getSpecificPrograms(this.consultancyId).pipe(map(res=>{
    return res.map(el=> el.name)
   }))
  }

  onSubmit(){}

  addProgram() {
    this.router.navigate(['consultancy/register-program'])
  }

  refreshPage() {
    console.log("Refresh button clicked");
    // Add your refresh logic here
  }

  deleteProgram(id: number) {
     this.consultancyApiService.deleteProgram(id).subscribe(res => {
      // this.programs = this.consultancyApiService.getPrograms(this.defaultData)
      alert("Deleted Successfully");
    })
  }



  editConsultancy(userId: number) {
    this.router.navigate(['consultancy/register-consultancy'],{queryParams:{editMode:true}})
  }

 
}
