import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  subscription:Subscription[] = [];


  constructor( private route:ActivatedRoute){
    
  }
  ngOnInit(){
    this.registerProgram = new FormGroup({
      ProgramName: new FormControl(''),
      ProgramDescription: new FormControl(''),
      Duration: new FormControl(''),
      ApplicationFee: new FormControl(''),
      TuitionFee: new FormControl(''),
      LevelOfEducation: new FormControl(''),
      Status: new FormControl(''),
      SubjectRequirements: new FormControl(''),
      AcademicRequirements: new FormControl(''),
      ProgramCategoryId: new FormControl(''),
      ProgramIntake: new FormControl(''),
      IntakeId: new FormControl(''),
      InstituteId: new FormControl('')
    });

    const details = this.route.snapshot.data['editResponse']
    if(details){
      this.editMode = true
      this.registerProgram.patchValue(details)
    }
  
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.forEach(sub => sub.unsubscribe());
    }
  }

  
  
  onSubmit(){

  }
  
}
