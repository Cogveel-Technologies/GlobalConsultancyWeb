import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-session',
  templateUrl: './register-session.component.html',
  styleUrls: ['./register-session.component.scss']
})
export class RegisterSessionComponent {
  constructor(private route:ActivatedRoute){}
  registerSession: FormGroup;
  breadscrums = [
    {
      title: 'Add Session',
      items: ['Consultancy'],
      active: 'Add Session',
    },
  ];
  
  editMode:boolean

  ngOnInit(){
    this.registerSession = new FormGroup(
      {
        SessionName: new FormControl(''),
        InstituteId: new FormControl(''),
        Year: new FormControl('')
    })
    
    const editSession = this.route.snapshot.data['editResponse'];
    if(editSession){
      this.editMode = true;
      this.registerSession.patchValue(editSession)
    }

  }


  onSubmit(): void {
    if (this.registerSession.valid) {
      console.log(this.registerSession.value);
      // Handle form submission logic here
    } else {
      // Handle form validation errors here
      console.log('Form is invalid');
    }
  }
}
