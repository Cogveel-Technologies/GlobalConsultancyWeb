import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstituteData } from '../consultancy-models/data.institute';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ConsultancyServdece } from '../consultancy.service';
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
  registerConsultancy: FormGroup;
  editMode: boolean;
  institutes: InstituteData[];
  editId: number;
  subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private route: ActivatedRoute, private consultancyApiService: ConsultancyApi, private toastr:ToastrService, private consultancyService:ConsultancyService) { }

  ngOnInit() {
    this.registerConsultancy = new FormGroup({
      consultancyName: new FormControl(''),
      phone1: new FormControl(''),
      phone2: new FormControl(''),
      email1: new FormControl(''),
      email2: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      street: new FormControl(''),
      pincode: new FormControl(''),
      registrationNo: new FormControl(''),
      website: new FormControl(''),
      fbUrl: new FormControl(''),
      linkedInUrl: new FormControl(''),
      yearEstablished: new FormControl(''),
      password: new FormControl(''),
    })

    // for editMode
    const editConsultancy = this.route.snapshot.data['editResponse'];
    this.editId = +this.route.snapshot.paramMap.get('id');
    if (editConsultancy) {
      this.editMode = true;
      this.registerConsultancy.patchValue(editConsultancy);
    }

  }

  navigateToConsultancyList(){
    this.router.navigate(["consultancy", "consultancy-list"])
  }
  
  onSubmit() {
    let newDetails = this.registerConsultancy.value;
    newDetails.id = this.editId;
    if (this.editMode) {
      this.subscriptions.add(this.consultancyApiService.updateConsultancy(newDetails).subscribe(res => {
        if(res['status'] < 400 && res['status'] >= 200){
          this.navigateToConsultancyList()
        }
      }))
    } else {
      this.subscriptions.add(this.consultancyApiService.registerConsultancy(newDetails).subscribe(res=> {
        if(res['status'] < 400 && res['status'] >= 200){
          this.navigateToConsultancyList()
        }
      }))
      
    }
   
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}