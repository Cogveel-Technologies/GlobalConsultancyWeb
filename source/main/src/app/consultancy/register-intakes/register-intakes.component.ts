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
      title: 'Add',
      items: ['Intakes'],
      active: 'Add',
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


  ngOnInit(): void {
    // Initialize data for programs, institutes, sessions
    this.registerIntake = new FormGroup({
      instituteId: new FormControl(''),
      sessionId: new FormControl(''),
      noOfIntake: new FormControl(''),
      programId: new FormControl(''),
      year: new FormControl('')
    });

    // this.defaultData.ConsultancyId = this.consultancyId
    this.institutes = this.consultancyApiService.getSpecificInstitutes(this.consultancyId)

    const editIntake = this.route.snapshot.data['editResponse'];
    if (editIntake) {
      console.log(editIntake)
      this.editId = +this.route.snapshot.paramMap.get('id');
      this.editMode = true;
      this.registerIntake.patchValue(editIntake);
    }

    combineLatest([this.institute$, this.session$, this.program$]).pipe(switchMap(([instituteId]) => {
      if (instituteId) {
        console.log(instituteId)
        this.defaultData.InstituteId = String(instituteId);
        this.defaultData.SessionId = String(instituteId)
        this.sessions = this.consultancyApiService.getSpecificSessions(this.defaultData)
        return this.programs = this.consultancyApiService.getAllPrograms(this.defaultData)
      } else {
        return of([])
      }
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
