import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { BehaviorSubject, combineLatest, Observable, of, Subscription, switchMap } from 'rxjs';
import { ConsultancyService } from '../consultancy-services/consultancy.service';



@Component({
  selector: 'app-register-session',
  templateUrl: './register-session.component.html',
  styleUrls: ['./register-session.component.scss']
})
export class RegisterSessionComponent {
  constructor(private route: ActivatedRoute, private router: Router, private consultancyApiService: ConsultancyApi, private consultancyService:ConsultancyService) { }
  breadscrums = [
    {
      title: 'Add Session',
      items: ['Sessions'],
      active: 'Add Session',
    },
  ];

  registerSession: FormGroup;
  editMode: boolean;
  institutes: Observable<SpecificConsultancyRelated[]>;
  programs: Observable<SpecificConsultancyRelated[]>;
  consultancyId: string = localStorage.getItem("id");
  instituteId: number;
  programId:number;
  editId: number;
  subscription: Subscription = new Subscription();
  instituteSelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  programSelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  defaultData = this.consultancyService.defaultRenderData()
  


  ngOnInit() {
    this.registerSession = new FormGroup(
      {
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
        instituteId: new FormControl(''),
        programId: new FormControl('')
      })

    // get institutes
    this.institutes = this.consultancyApiService.getSpecificInstitutes();
    combineLatest([this.instituteSelected]).pipe(switchMap(([institute])=>{
      if(institute){
        console.log(this.instituteId)
        this.defaultData.InstituteId = String(this.instituteId);
        return this.programs = this.consultancyApiService.getAllPrograms(this.defaultData)
      }else{
        return of([])
      }
    })).subscribe()

    // edit session
    const editSession = this.route.snapshot.data['editResponse'];
    if (editSession) {
      this.editId = editSession.id;
      const [fromDate,toDate] = editSession.sessionName.split('-');
      editSession.fromDate = fromDate;
      editSession.toDate = toDate;
      console.log(editSession)
      this.registerSession.patchValue(editSession);
      this.editMode = true;
    }

  }


  onInstituteChange(event: any) {
    this.instituteId = event.value
    this.instituteSelected.next(true)
    console.log(this.instituteId)
  }

  onProgramChange(event:any){
   this.programId = event.value;
  }

  status:boolean[] = [true, false]

  routeToSessionList() {
    if(this.editMode){
      this.consultancyService.showList.next(true)
      this.router.navigate(['consultancy', 'session-list'])
    }else{
      this.router.navigate(['consultancy', 'session-list'])
    }
   
  }

  onFromDateSelected(selectedDate:any) {
    const year = selectedDate['_i'].year;
    const month = selectedDate['_i'].month + 1;
    const fromDate = `${month}/${year}`;
    console.log(fromDate)
    this.registerSession.get('fromDate')?.setValue(fromDate);
    console.log(this.registerSession.get('fromDate'))
    console.log(this.registerSession.value)
  }

  onToDateSelected(data:any){
    const year = data['_i'].year;
    const month = data['_i'].month + 1;
    const toDate = `${month}/${year}`;
    console.log(toDate)
    this.registerSession.get('toDate')?.setValue(toDate);
    console.log(this.registerSession.value)
  }

  onSubmit(): void {
    const sessionDetails = this.registerSession.value;
    sessionDetails.sessionName = `${sessionDetails.fromDate} - ${sessionDetails.toDate}`;
    console.log(sessionDetails)
    sessionDetails.consultancyId = +this.consultancyId;

    if (this.editMode) {
      this.subscription.add(this.consultancyApiService.updateSession(this.editId, sessionDetails)
        .subscribe(res => {
          if (res['status'] >= 200 && res['status'] < 300) {
            this.routeToSessionList()
          }
        }))
    } else {
      // call api to record new session in db
      sessionDetails.instituteId = this.instituteId;
      this.subscription.add(this.consultancyApiService.registerSession(sessionDetails)
        .subscribe(res => {
          if (res['status'] >= 200 && res['status'] < 300) {
            console.log(sessionDetails)
            this.routeToSessionList()
          }
        }))

    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
