import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, distinctUntilChanged, of, Subscription, switchMap, tap } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { Observable } from 'rxjs';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';

@Component({
  selector: 'app-register-program',
  templateUrl: './register-program.component.html',
  styleUrls: ['./register-program.component.scss']
})
export class RegisterProgramComponent {
  constructor(private route: ActivatedRoute, private consultancyApiService: ConsultancyApi, private router: Router, private consultancyService: ConsultancyService) { }

  breadscrums = [
    {
      title: 'Add Program',
      items: ['Consultancy'],
      active: 'Add Program',
    },
  ];
  registerProgram: FormGroup;
  editMode: boolean;
  programCategoryOptions: Observable<SpecificConsultancyRelated[]>;
  courseTypeOptions: Observable<SpecificConsultancyRelated[]>;
  statusOptions: string[] = ["Active", "Inactive"];
  isPublic: boolean[] = [true, false];
  subscriptions: Subscription = new Subscription();
  editId: number;
  consultancyId: string = localStorage.getItem("id");
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  instituteOptions: Observable<SpecificConsultancyRelated[]>;
  sessionOptions: Observable<SpecificConsultancyRelated[]>;
  intakeOptions: Observable<SpecificConsultancyRelated[]>;
  institute$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  session$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  intake$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  previousSessionState: (number | null) = null;
  previousIntakeState: (number | null) = null;
  previousInstituteState: (number | null) = null



  ngOnInit() {
    this.registerProgram = new FormGroup({
      programName: new FormControl(''),
      programDescription: new FormControl(''),
      duration: new FormControl(''),
      applicationFee: new FormControl(''),
      tutionFee: new FormControl(''),
      sessionId: new FormControl('', Validators.required),
      levelOfEducation: new FormControl(''),
      status: new FormControl(''),
      subjectRequirements: new FormControl(''),
      academicRequirements: new FormControl(''),
      programCategoryId: new FormControl(''),
      programIntake: new FormControl(''),
      intakeId: new FormControl('', Validators.required),
      instituteId: new FormControl('', Validators.required),
      courseTypeId: new FormControl(''),
      isPublic: new FormControl('')
    });

    this.instituteOptions = this.consultancyApiService.getSpecificInstitutes(this.consultancyId);
    this.programCategoryOptions = this.consultancyApiService.getCategory("programCategory");
    this.courseTypeOptions = this.consultancyApiService.getCategory("courseType");


    this.subscriptions.add(
      combineLatest([
        this.institute$.pipe(distinctUntilChanged()),
        this.session$.pipe(distinctUntilChanged()),
        this.intake$.pipe(distinctUntilChanged()),
      ])
        .pipe(
          switchMap(([instituteId, sessionId, intakeId]) => {
            console.log(instituteId, sessionId, intakeId)

            // When the institute changes (or is reselected), reset session and intake
            if (instituteId && instituteId !== this.previousInstituteState) {

              // Store the last selected institute
              this.previousInstituteState = instituteId;

              console.log(this.previousInstituteState)

              // Reset session form control and BehaviorSubject to ensure no default value
              this.registerProgram.get("sessionId").reset();
              this.registerProgram.get("intakeId").reset();
              this.session$.next(null);
              this.intake$.next(null);
              this.sessionOptions = null;
              this.intakeOptions = null

              // Make API call for sessions based on the selected institute
              this.defaultData.InstituteId = String(instituteId);
              this.sessionOptions = this.consultancyApiService.getSpecificSessions(this.defaultData).pipe(
                tap(() => {
                  // After getting the new sessions, clear the session selection to avoid default
                  this.registerProgram.get("sessionId").reset();
                  this.session$.next(null);
                })
              );

              return of([]);  // Return empty observable
            }

            // When institute and session are selected, but intake is not
            if (instituteId && sessionId && !intakeId) {

              if (sessionId !== this.previousSessionState) {
                this.previousSessionState = sessionId;
                this.defaultData.SessionId = String(sessionId);

                // Make API call for intakes based on session
                this.intakeOptions = this.consultancyApiService.getSpecificIntakes(this.defaultData);
                return of([]);
              }else{
                // Make API call for intakes based on session
                this.intakeOptions = this.consultancyApiService.getSpecificIntakes(this.defaultData);
                return of([]);
             }
            }

            if (instituteId && sessionId && intakeId) {
              console.log("helllooooo")
              if (sessionId !== this.previousSessionState) {
                this.intake$.next(null)
                this.previousSessionState = sessionId;
              }
            }

            // Default case: return an empty observable
            return of([]);
          })
        ).subscribe()
    );

    const details = this.route.snapshot.data['editResponse']

    if (details) {
      console.log(details)
      this.editId = +this.route.snapshot.paramMap.get('id');
      this.editMode = true
      this.institute$.next(details.instituteId);
      this.session$.next(details.sessionId);
      this.intake$.next(details.intakeId)
      this.registerProgram.patchValue(details)
    }
  }

  onInstituteChange(event: any) {
    console.log(event.value)
    this.institute$.next(event.value)
  }
  onSessionChange(event: any) {
    console.log(event.value)
    this.session$.next(event.value)
  }
  onIntakeChange(event: any) {
    console.log(event.value)
    this.intake$.next(event.value)
  }

  navigateToProgramList() {
    if (this.editMode) {
      this.consultancyService.showList.next(true)
      this.router.navigate(["consultancy", "program-list"]);
    } else {
      this.router.navigate(["consultancy", "program-list"]);
    }
  }

  onSubmit() {
    let newDetails = this.registerProgram.value;
    newDetails.consultancyId = +this.consultancyId;
    console.log(newDetails)
    if (this.editMode) {
      this.subscriptions.add(this.consultancyApiService.updateProgram(this.editId, newDetails).subscribe(res => {
        if (res['status'] >= 200 && res['status'] < 300) {
          this.navigateToProgramList()
        }
      }))
    } else {
      this.subscriptions.add(this.consultancyApiService.registerProgram(newDetails).subscribe(res => {
        if (res['status'] >= 200 && res['status'] < 300) {
          this.navigateToProgramList()
        }
      }))
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
