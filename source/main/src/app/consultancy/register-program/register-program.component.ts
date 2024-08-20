import { Component,OnInit,OnDestroy,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';

@Component({
  selector: 'app-register-program',
  templateUrl: './register-program.component.html',
  styleUrls: ['./register-program.component.scss']
})
export class RegisterProgramComponent {
  breadscrums = [
    {
      title: 'Add Program',
      items: ['Consultancy'],
      active: 'Add Program',
    },
  ];
  registerProgram:FormGroup;
  editMode:boolean;
  programCategoryOptions = [101, 102, 103,1]; 
  programIntakeOptions = [200, 201, 202];
  intakeOptions = [1001, 1002, 1003,12]; 
  instituteOptions = [5001, 5002, 5003,9]; 
  statusOptions = ["Active","Inactive"]
  subscriptions: Subscription = new Subscription();
  editId:number


  constructor( private route:ActivatedRoute, private consultancyApiService:ConsultancyApi, private router:Router){
    
  }
  ngOnInit(){
    this.registerProgram = new FormGroup({
      programName: new FormControl(''),
      programDescription: new FormControl(''),
      duration: new FormControl(''),
      applicationFee: new FormControl(''),
      tutionFee: new FormControl(''),
      levelOfEducation: new FormControl(''),
      status: new FormControl(''),
      subjectRequirements: new FormControl(''),
      academicRequirements: new FormControl(''),
      programCategoryId: new FormControl(''),
      programIntake: new FormControl(''),
      intakeId: new FormControl(''),
      instituteId: new FormControl('')
    });

    this.editId = +this.route.snapshot.paramMap.get('id');
    const details = this.route.snapshot.data['editResponse']
    console.log(details)
    if(details){
      this.editMode = true
      this.registerProgram.patchValue(details)
    }
  
  }

  ngAfterViewInit(){
    
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  
  
  onSubmit(){
    let newDetails = this.registerProgram.value;
    console.log(newDetails)
    if (this.editMode) {
      this.subscriptions.add(this.consultancyApiService.updateProgram(this.editId,newDetails).subscribe(res => {
        alert("Updated Sucessfully")
        this.router.navigate(["consultancy", "program-list"]);
      }))
    } else {
      this.subscriptions.add(this.consultancyApiService.registerProgram(newDetails).subscribe(res =>{
         alert("Registered Successfully")
         this.router.navigate(["consultancy", "program-list"]);
        }))
    }
  }
  
}
