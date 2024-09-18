import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, of, Subscription, switchMap } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { Observable } from 'rxjs';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from '../consultancy-services/consultancy.service';

@Component({
  selector: 'app-register-intakes',
  templateUrl: './register-intakes.component.html',
  styleUrls: ['./register-intakes.component.scss']
})
export class RegisterIntakesComponent {

  constructor(private route:ActivatedRoute, private consultancyApiService:ConsultancyApi, private router:Router, private consultancyService:ConsultancyService) {}
  breadscrums = [
    {
      title: 'Add Intake',
      items: ['Consultancy'],
      active: 'Add Intake',
    },
  ];

  editMode: boolean = false;
  subscriptions: Subscription = new Subscription();
  consultancyId:string = localStorage.getItem("id");
  editId:number;
  defaultData:ConsultancyDetailsOptions = {...this.consultancyService.defaultRenderData()}
  institutes: Observable<SpecificConsultancyRelated[]>;
  sessions:Observable<SpecificConsultancyRelated[]>;
  registerIntake: FormGroup;
  sessionId$:BehaviorSubject<number|null>= new BehaviorSubject<number|null>(null)


  ngOnInit(): void {
    // Initialize data for programs, institutes, sessions
    this.registerIntake = new FormGroup({
      programId: new FormControl(''),
      instituteId: new FormControl(''),
      sessionId: new FormControl(''),
      noOfIntake: new FormControl(''),
      year: new FormControl('')
    });
    
    this.defaultData.ConsultancyId = this.consultancyId
    this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData)
    
    const editIntake = this.route.snapshot.data['editResponse'];
    if (editIntake) {
      this.editId = +this.route.snapshot.paramMap.get('id');
      this.editMode = true;
      this.registerIntake.patchValue(editIntake);
    }

    combineLatest([this.sessionId$]).pipe(switchMap(([sessionId])=>{
      if(sessionId){
        this.defaultData.SessionId = String(sessionId);
      return this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData)
      }else{
        return of([])
      }
    })).subscribe()
  }

  onSessionChange(event:any){
    console.log(event)
  }



  navigateToIntakeList(){
    if(this.editMode){
      this.consultancyService.showList.next(true)
      this.router.navigate(["consultancy", "intake-list"]);
    }else{
      this.router.navigate(["consultancy", "intake-list"]);
    }
  }
 

  onSubmit() {
    let newDetails = this.registerIntake.value;
    newDetails.consultancyId = this.consultancyId
    
    if (this.editMode) {
      this.subscriptions.add(this.consultancyApiService.updateIntake(this.editId,newDetails).subscribe(res => {
        if (res['status'] >= 200 && res['status'] < 300) {
        this.navigateToIntakeList()
      }
      }))
    } else {
      this.subscriptions.add(this.consultancyApiService.registerIntake(newDetails).subscribe(res => {
        if (res['status'] >= 200 && res['status'] < 300) {
        this.navigateToIntakeList()
      }
      }))
     
    }
  }
}
