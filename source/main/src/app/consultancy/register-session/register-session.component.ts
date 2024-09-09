import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-register-session',
  templateUrl: './register-session.component.html',
  styleUrls: ['./register-session.component.scss']
})
export class RegisterSessionComponent {
  constructor(private route:ActivatedRoute, private router:Router, private consultancyApiService:ConsultancyApi){}
  breadscrums = [
    {
      title: 'Add Session',
      items: ['Consultancy'],
      active: 'Add Session',
    },
  ];
  
  registerSession: FormGroup;
  editMode:boolean;
  institutes:Observable<SpecificConsultancyRelated[]>;
  consultancyId:string = localStorage.getItem("id");
  instituteId:number;
  editId:number;
  subscription:Subscription = new Subscription()


  ngOnInit(){
    this.registerSession = new FormGroup(
      {
        sessionName: new FormControl(''),
        instituteId: new FormControl(''),
        year: new FormControl('')
    })
    
     // get institutes
     this.institutes = this.consultancyApiService.getSpecificInstitutes(this.consultancyId);

    // edit session
    const editSession = this.route.snapshot.data['editResponse'];
    if(editSession){
      this.editId = +this.route.snapshot.paramMap.get('id');
      this.instituteId = editSession.instituteId;
      this.editMode =true;
      this.registerSession.patchValue(editSession);
    }
    
  }

  onInstituteChange(event:any){
    this.instituteId = event.value
  }

  routeToSessionList(){
     this.router.navigate(['consultancy', 'session-list'])
  }


  onSubmit(): void {
    const sessionDetails = this.registerSession.value;

     // add consultancy id
     sessionDetails.consultancyId = +this.consultancyId;
    
    if (this.editMode) {
      this.subscription.add(this.consultancyApiService.updateSession(this.editId, sessionDetails)
      .subscribe(res=> this.routeToSessionList()))
    } else {
       // call api to record new session in db
       sessionDetails.instituteId = this.instituteId;
       this.subscription.add(this.consultancyApiService.registerSession(sessionDetails)
       .subscribe(res => this.routeToSessionList()))
      
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
