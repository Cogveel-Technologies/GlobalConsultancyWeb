import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, of, Subscription, switchMap } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { Observable } from 'rxjs';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { Moment } from 'moment';



@Component({
  selector: 'app-register-intakes',
  templateUrl: './register-intakes.component.html',
  styleUrls: ['./register-intakes.component.scss']
})
export class RegisterIntakesComponent {

  constructor(private route: ActivatedRoute, private consultancyApiService: ConsultancyApi, private router: Router, private consultancyService: ConsultancyService) { }
  breadscrums = [
    {
      title: 'Add Intake',
      items: ['Intakes'],
      active: 'Add Intake',
    },
  ];

  editMode: boolean = false;
  subscriptions: Subscription = new Subscription();
  consultancyId: string = localStorage.getItem("id");
  editId: number;
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() }
  institutes: Observable<SpecificConsultancyRelated[]>;
  sessions: Observable<SpecificConsultancyRelated[]>;
  programs: Observable<SpecificConsultancyRelated[]>;
  registerIntake: FormGroup;
  sessionId$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>('')
  startYear: Moment;
  institute$: BehaviorSubject<string | number> = new BehaviorSubject('');
  session$: BehaviorSubject<string | number> = new BehaviorSubject('');
  program$: BehaviorSubject<string | number> = new BehaviorSubject('');
  previousInstituteId: number = 0;
  previousProgramid: number = 0;
  roleName = localStorage.getItem("roleName");


  ngOnInit(): void {
    // Initialize data for programs, institutes, session
    this.registerIntake = new FormGroup({
      instituteId: new FormControl(''),
      sessionId: new FormControl(''),
      noOfIntake: new FormControl(''),
      programId: new FormControl(''),
      year: new FormControl('')
    });

    // this.defaultData.ConsultancyId = this.consultancyId
    if(this.roleName !=='superadmin'){
      this.institutes = this.consultancyApiService.getSpecificInstitutes(this.defaultData);
    }else{
      this.defaultData.IsAdmin = true;
      this.institutes = this.consultancyApiService.getSpecificInstitutes(this.defaultData);
    }

    const editIntake = this.route.snapshot.data['editResponse'];
    if (editIntake) {
      console.log(editIntake)
      this.editId = +this.route.snapshot.paramMap.get('id');
      this.institute$.next(editIntake.instituteId);
      this.program$.next(editIntake.instituteId);
      this.registerIntake.patchValue(editIntake);
      this.editMode = true;
    }

    combineLatest([this.institute$, this.session$, this.program$]).pipe(switchMap(([instituteId, sessionId, programId]) => {
      if (instituteId && this.previousInstituteId !== instituteId) {
        this.previousInstituteId = +instituteId
        this.defaultData.InstituteId = String(instituteId);
        this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData);
        return this.programs = this.consultancyApiService.getAllPrograms(this.defaultData)
      }
      return of([])

    })).subscribe()
  }

  onInstituteChange(event: any) {
    this.institute$.next(event.value)
  }

  onSessionChange(event: any) {
    this.session$.next(event.value)
  }

  onProgramChange(event: any) {
    this.program$.next(event.value)
  }


  navigateToIntakeList() {
    if (this.editMode) {
      this.consultancyService.showList.next(true)
      this.router.navigate(["consultancy", "intake-list"]);
    } else {
      this.router.navigate(["consultancy", "intake-list"]);
    }
  }

  // Filter function to allow all dates (past, today, and future)
  date = (date: Date | null): boolean => {
    return true; // Allow all dates without restriction
  };

  onSubmit() {
    let newDetails = this.registerIntake.value;
    newDetails.consultancyId = +this.consultancyId

    if (this.editMode) {
      this.subscriptions.add(this.consultancyApiService.updateIntake(this.editId, newDetails).subscribe(res => {
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
