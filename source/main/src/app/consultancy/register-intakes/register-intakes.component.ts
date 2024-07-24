import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-intakes',
  templateUrl: './register-intakes.component.html',
  styleUrls: ['./register-intakes.component.scss']
})
export class RegisterIntakesComponent {
  editMode: boolean = false;
  breadscrums = [
    {
      title: 'Add Intake',
      items: ['Consultancy'],
      active: 'Add Intake',
    },
  ]; // Your breadcrumb data
  programs = [{'id':"program1", 'name':"kldfjsdl"},{'id':'program2', 'name':"kljdsfslkaj"}]; // Your program data
  institutes = [{'id':"program1", 'name':"kldfjsdl"},{'id':'program2', 'name':"kljdsfslkaj"}]; // Your institute data
  sessions = [{'id':"program1", 'name':"kldfjsdl"},{'id':'program2', 'name':"kljdsfslkaj"}]; // Your session data

  registerIntake: FormGroup;
  constructor(private route:ActivatedRoute) {}

  ngOnInit(): void {
    // Initialize data for programs, institutes, sessions
    this.registerIntake = new FormGroup({
      ProgramId: new FormControl(''),
      InstituteId: new FormControl(''),
      SessionId: new FormControl(''),
      NoOfIntake: new FormControl(''),
    });

    const editIntake = this.route.snapshot.data['editResponse'];
    if(editIntake){
      console.log(editIntake)
      this.editMode = true;
      this.registerIntake.patchValue(editIntake)
    }
  }

  onSubmit() {
    if (this.registerIntake.valid) {
      // Handle form submission
    }
  }
}
