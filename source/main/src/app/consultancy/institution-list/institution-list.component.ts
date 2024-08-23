import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { map, Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { InstituteData } from '../consultancy-models/data.institute';
import { FormControl, FormGroup } from '@angular/forms';


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

  constructor(private router: Router, private consultancyService:ConsultancyService,private consultancyApiService:ConsultancyApi ) { }
  editMode: boolean;
  defaultData:ConsultancyDetailsOptions = {...this.consultancyService.defaultRenderData()};
  subscriptions: Subscription = new Subscription();
  consultancyId:string = localStorage.getItem("id")
  universities!: Observable<InstituteData[]>;
  countrySelected:boolean=false;
  // countries:Observable<string>;
  countries = ["India","Pakistan","Austrailia"]
  countryListForm:FormGroup;
  getInstitutes( params:ConsultancyDetailsOptions){
     return this.consultancyApiService.getInstitutes(params)
  }
  


 
  ngOnInit() { 
    this.countryListForm = new FormGroup({
      countryList: new FormControl(),
    })

  //  this.countries = this.consultancyApiService.getAllCountries().pipe(map(res=>{
  //   return res.map(el=> el.name)
  //  }))
  }

  onSubmit(){}


  addInstitute() {
    this.router.navigate(['consultancy/register-consultancy'])
  }

  deleteInstitute(id:number){
    const con =  confirm("Are you sure?")
    if(con){
      this.consultancyApiService.deleteInstitute(id).subscribe(res=> {
        this.universities = this.consultancyApiService.getInstitutes(this.defaultData)
      });
    }
  }

  refreshPage() {
    console.log("Refresh button clicked");
    // Add your refresh logic here
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }

}