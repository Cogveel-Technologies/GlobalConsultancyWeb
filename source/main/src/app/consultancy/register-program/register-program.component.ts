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
      items: ['Programs'],
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
  sessionOptions: Observable<{id:number,sessionName:string}[]>;
  institute$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  session$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  intake$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  previousSessionState: (number | null) = null;
  previousIntakeState: (number | null) = null;
  previousInstituteState: (number | null) = null
  sessions = new FormControl('')



  ngOnInit() {
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
      instituteId: new FormControl('', Validators.required),
      courseTypeId: new FormControl(''),
      isPublic: new FormControl('')
    });

    this.instituteOptions = this.consultancyApiService.getSpecificInstitutes();
    this.programCategoryOptions = this.consultancyApiService.getCategory("programCategory");
    this.courseTypeOptions = this.consultancyApiService.getCategory("courseType");



    const details = this.route.snapshot.data['programDetails']
    console.log(details)

    if (details) {
      console.log(details)
      this.editId = +this.route.snapshot.paramMap.get('id');
      this.defaultData.ProgramId = String(this.editId)
      this.sessionOptions = this.consultancyApiService.getProgramSessions(this.defaultData).pipe(tap(res=>{
        this.sessions.setValue(res[0].id)
      }))
      this.editMode = true;
      this.institute$.next(details.instituteId);
      this.session$.next(details.sessionId);
      this.intake$.next(details.intakeId);
      this.registerProgram.patchValue(details)
    }
  }

  onInstituteChange(event: any) {
    console.log(event.value)
    this.institute$.next(event.value)
  }
  onSessionSelected(event: any) {
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
