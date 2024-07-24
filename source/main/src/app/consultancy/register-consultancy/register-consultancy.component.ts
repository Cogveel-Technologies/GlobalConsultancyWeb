import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router, UrlSegment } from '@angular/router'; 
import { Subscription } from 'rxjs';

import { InstituteData } from '../consultancy-models/data.institute';
import { ConsultancyService } from '../consultancy-services/consultancy.service';



@Component({
  selector: 'app-register-consultancy',
  templateUrl: './register-consultancy.component.html',
  styleUrls: ['./register-consultancy.component.scss']
})
export class RegisterConsultancyComponent {
  breadscrums = [
    {
      title: 'Add Consultancy',
      items: ['Consultancy'],
      active: 'Add Consultancy',
    },
  ];
  registerConsultancy:FormGroup;
  editMode:boolean;
  subscription:Subscription[] = [];
  details:any;
  id:number;
  institutes:InstituteData[];
  consultancyId:any
  index:number




  constructor(private consultancyService:ConsultancyService, private router:Router, private route:ActivatedRoute){
    
  }
  ngOnInit(){
    this.registerConsultancy = new FormGroup({
      ConsultancyName: new FormControl(''),
      Phone1: new FormControl(''),
      Phone2: new FormControl(''),
      Email1: new FormControl(''),
      Email2: new FormControl(''),
      Country: new FormControl(''),
      State:new FormControl(''),
      City: new FormControl(''),
      Address: new FormControl(''),
      Street: new FormControl(''),
      Pincode: new FormControl(''),
      RegistrationNo: new FormControl(''),
      Website: new FormControl(''),
      FbUrl: new FormControl(''),
      LinkedInUrl: new FormControl(''),
      YearEstablished: new FormControl(''),
      Password: new FormControl(''),
    })

    // for editMode
    const editConsultancy = this.route.snapshot.data['editResponse']
    if(editConsultancy){
      this.editMode = true;
      this.registerConsultancy.patchValue(editConsultancy);
    } 
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.forEach(sub => sub.unsubscribe());
    }
  }

  
  
  onSubmit(){
    const newDetails = this.registerConsultancy.value;
    if(this.editMode){
      this.consultancyService.data[this.index] = newDetails
    }else{
      console.log(this.registerConsultancy.value)
      this.consultancyService.data.push(newDetails)
    }
    this.router.navigate(['consultancy/consultancy-list']);
  }
  
}