import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';

@Component({
  selector: 'app-register-intakes',
  templateUrl: './register-intakes.component.html',
  styleUrls: ['./register-intakes.component.scss']
})
export class RegisterIntakesComponent {
  editMode: boolean = false;
  subscriptions: Subscription = new Subscription();
  editId:number;
  breadscrums = [
    {
      title: 'Add Intake',
      items: ['Consultancy'],
      active: 'Add Intake',
    },
  ]; //  breadcrumb data
  programs = [12,13,1313,24]; //  program data
  institutes = [33,2323,11,434,9]; //  institute data
  sessions = [2323,11,243,21,1,2]; //  session data

  registerIntake: FormGroup;
  constructor(private route:ActivatedRoute, private consultancyApiService:ConsultancyApi, private router:Router) {}

  ngOnInit(): void {
    // Initialize data for programs, institutes, sessions
    this.registerIntake = new FormGroup({
      programId: new FormControl(''),
      instituteId: new FormControl(''),
      sessionId: new FormControl(''),
      noOfIntake: new FormControl(''),
      year: new FormControl('')
    });

    const editIntake = this.route.snapshot.data['editResponse'];
    this.editId = +this.route.snapshot.paramMap.get('id');
    if (editIntake) {
      this.editMode = true;
      this.registerIntake.patchValue(editIntake);
    }
  }

  onSubmit() {
    let newDetails = this.registerIntake.value;
    console.log(newDetails)
    console.log(this.editMode)
    if (this.editMode) {
      this.subscriptions.add(this.consultancyApiService.updateIntake(this.editId,newDetails).subscribe(res => {
        alert("Updated Sucessfully")
        this.router.navigate(["consultancy", "intake-list"]);
      }))
    } else {
      this.subscriptions.add(this.consultancyApiService.registerIntake(newDetails).subscribe(res => {
        alert("Registered Successfully")
        this.router.navigate(["consultancy", "intake-list"]);
      }))
     
    }
  }
}
