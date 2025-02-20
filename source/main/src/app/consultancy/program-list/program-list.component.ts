import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramData } from '../consultancy-models/data.program';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { BehaviorSubject, combineLatest, filter, map, Observable, of, startWith, Subscription, switchMap, tap, throttleTime } from 'rxjs';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { FormControl, FormGroup } from '@angular/forms';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { PageEvent } from '@angular/material/paginator';
import { distinctUntilChanged } from 'rxjs';
import { AdminService } from 'app/admin/admin.service';
 
 
 
 
@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
 
  breadscrums = [
    {
      title: 'Programs',
      items: ['Consultancy'],
      active: 'Programs',
      activeRoute: this.router.url
    },
  ];
 
  constructor(private router: Router, private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService, private adminService: AdminService) { }
  editMode: boolean;
  programs!: Observable<ProgramData[]>;
  programsOnInstitutes: Observable<SpecificConsultancyRelated[]>;
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  consultancyId: string = localStorage.getItem("id");
  selectedOptions: boolean = false;
  institutes: Observable<SpecificConsultancyRelated[]> | any;
  instituteForm: FormGroup;
  institute$: BehaviorSubject<number | ''> = new BehaviorSubject<number | ''>('');
  subscription: Subscription = new Subscription();
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize?: number, pageIndex?: number, instituteId?: number, consultancyId?: number | string, search?: boolean }> = new BehaviorSubject<{ pageSize?: number, pageIndex?: number, instituteId?: number, consultancyId?: number | string, search?: boolean }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage, instituteId: +this.defaultData.InstituteId, consultancyId: this.defaultData.ConsultancyId, search: true });
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression, });
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  previousInstituteState: number = 0;
  previousConsultancyState: number | string = '';
  currentPageIndex: number;
  instituteControl: FormControl = new FormControl("all");
  consultancyControl: FormControl = new FormControl("all");
  ProgramFromInstitute: number = 0;
  roleName: string = localStorage.getItem('roleName');
  consultancies: Observable<[{ id: number, consultancyName: string }]> | any;
  instituteId: number;
  instituteName: string;
  programEditState: boolean = false
  consultancyPrograms: boolean = false
  consultancyName: string
  isPrograms:boolean
 
 
 
 
  getPrograms(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getPrograms(params).pipe
      (tap(res => {
        if ((!res['data'] || res['data'].length === 0) && params.currentPage > 1) {
          console.log("Condition met: No data and currentPage > 1");
          this.pagination$.next({ pageIndex: this.defaultData.currentPage - 1, pageSize: this.defaultData.pageSize, search: true });
        }
      }),
        filter(res => !((!res['data'] || res['data'].length === 0) && params.currentPage > 1)), map(res => {
          this.records = res['pageInfo']['totalRecords'];
          return res['data']
        }))
  }
 
  ngOnInit() {
 
    this.consultancyService.activeRoute.next(this.router.url)
 
    this.adminService.consultancyProgramPaginationState.subscribe(res => {
      if (res) {
        this.adminService.consultancyProgramState.next(true)
      }
    })
    // programs of consultancy
    if (this.roleName === 'superadmin') {
      this.adminService.consultancyProgram.subscribe(res => {
        if (res) {
          console.log(res)
          this.consultancyPrograms = true;
          this.consultancyName = res.consultancyName
          this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, search: true, consultancyId: res.id })
        }
      })
    }
 
    // delete
    this.consultancyService.sendDeleteIdtoPC.subscribe(res => {
      if (res) {
        this.subscription.add(this.consultancyApiService.deleteProgram(res).subscribe(() => {
          this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage, search: true })
        }));
        this.consultancyService.sendDeleteIdtoPC.next(null)
      }
    })
 
    // if user navigates back (using breadscrum)
    this.consultancyService.breadscrumState.subscribe(res => {
      if (res) {
        this.consultancyService.editProgramCurrentPageAndPageSize.subscribe(res => {
          this.pagination$.next(res)
        })
      }
    })
 
    console.log(this.breadscrums[0].activeRoute)
    this.consultancyService.programEditState.subscribe(res => {
      this.programEditState = res
    })
 
    this.consultancyService.intakeProgramState.subscribe(res => {
      if (res) {
        this.consultancyService.editProgramCurrentPageAndPageSize.subscribe(res => {
          this.pagination$.next(res)
        })
      }
    })
 
    if (this.programEditState) {
      this.consultancyService.editProgramCurrentPageAndPageSize.subscribe(res => {
        console.log("Mmmm")
        console.log(res)
        this.pagination$.next(res)
      })
    }
 
    // if superadmin has logged in
    if (this.roleName === 'superadmin') {
      this.defaultData.IsAdmin = true;
      this.adminService.getAllConsultancies(this.defaultData).pipe(map(res => {
        res = [{ id: 'all', consultancyName: 'All' }, ...res]
        return res
      })).subscribe(res => {
        console.log(res)
        this.consultancies = res
      });
    } else {
      this.consultancyApiService.getSpecificInstitutes(this.defaultData).pipe(map(res => {
        res = [{ id: 0, name: 'All' }, ...res]
        return res
      })).subscribe(res => {
        this.institutes = res
      })
    }
    // get all program by default
    this.programs = this.getPrograms(this.defaultData)
 
    // show program from institute details
    this.subscription.add(this.consultancyService.sendInstituteId.subscribe(res => {
      if (res) {
        this.consultancyService.instituteProgramState.next(true)
        this.ProgramFromInstitute = res.id;
        this.instituteName = res.instituteName;
        this.consultancyName = res.consultancyName;
        this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, instituteId: res.id, search: true, consultancyId: res.consultancyId })
      }
    }))
 
    this.subscription.add(this.consultancyService.showList.subscribe(state => {
      this.selectedOptions = state;
    }));
 
    this.programs = combineLatest([this.searchTerm$, this.pagination$, this.sorting$])
      .pipe(throttleTime(1000, undefined, { leading: true, trailing: true }),
        distinctUntilChanged(),
        switchMap(([searchTerm, pageRelated, sorting]) => {
 
          if (pageRelated.instituteId === 0) {
            this.defaultData.ConsultancyId = ''
            this.defaultData.InstituteId = ''
            this.defaultData.ProgramId = ''
            this.defaultData.SessionId = ''
          }
 
          if (String(pageRelated.consultancyId) !== String(this.previousConsultancyState) && this.roleName === 'superadmin') {
            this.defaultData.InstituteId = ''
            this.previousConsultancyState = pageRelated.consultancyId;
            console.log(this.previousConsultancyState)
            this.instituteControl.setValue('');
            if (this.ProgramFromInstitute) {
              console.log(pageRelated.consultancyId)
              this.consultancyControl.setValue(pageRelated.consultancyId)
            }
            if (pageRelated.consultancyId && typeof pageRelated.consultancyId === 'number') {
              console.log(pageRelated.consultancyId)
              this.defaultData.ConsultancyId = String(pageRelated.consultancyId);
              if (!this.consultancyPrograms) {
                this.consultancyApiService.getSpecificInstitutes(this.defaultData).subscribe(res => this.institutes = res)
              }
            } else {
              this.institutes = []
              this.defaultData.ConsultancyId = '';
            }
          }
 
          if (pageRelated.instituteId && String(pageRelated.instituteId) && String(this.previousInstituteState) !== String(pageRelated.instituteId)) {
            if (this.ProgramFromInstitute) {
              console.log(pageRelated.instituteId)
              this.instituteControl.setValue(pageRelated.instituteId)
            }
            this.previousInstituteState = pageRelated.instituteId
            if (typeof pageRelated.instituteId !== "string") {
              this.defaultData.InstituteId = String(pageRelated.instituteId);
            } else {
              this.defaultData.InstituteId = ''
            }
          }
 
          if (pageRelated.search) {
            console.log(pageRelated)
            if (searchTerm) {
              this.defaultData.currentPage = 1;
              this.currentPageIndex = 0;
            } else {
              this.defaultData.currentPage = pageRelated.pageIndex;
              this.currentPageIndex = pageRelated.pageIndex - 1;
            }
            this.defaultData.searchText = searchTerm;
            this.defaultData.pageSize = pageRelated.pageSize;
            this.defaultData.sortExpression = sorting.direction;
            this.defaultData.OrderBy = sorting.field;
            console.log(this.defaultData)
            return this.getPrograms(this.defaultData).pipe(tap(res=>{
              if(res.length){
                this.isPrograms = true
              }else{
                this.isPrograms = false
              }
            }))
          }
          return of()
        }))
 
    // if we click on view or edit pencil, and then navigate back
    // if (this.selectedOptions) {
    //   console.log("hello")
    //   const instituteId = localStorage.getItem("instituteId")
    //   const sessionId = localStorage.getItem("sessionId")
    //   const intakeId = localStorage.getItem("intakeId")
    //   const isPublic = JSON.parse(localStorage.getItem("isPublic"))
    //   this.institute$.next(+instituteId)
    //   this.intake$.next(+intakeId)
    //   this.isPublic$.next(isPublic)
    //   this.defaultData.InstituteId = instituteId
    //   this.defaultData.SessionId = sessionId
    //   this.defaultData.IntakeId = intakeId
    //   this.defaultData.IsPublic = localStorage.getItem("isPublic")
    //   this.programs = this.getPrograms(this.defaultData)
    // }
  }
 
  onInstituteChange(event: any) {
    this.currentPageIndex = 0;
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, instituteId: event.value, consultancyId: this.defaultData.ConsultancyId })
  }
 
  isPublic(event: any) {
    console.log(event)
    // this.search$.next(event.value)
  }
 
  addProgram() {
    this.router.navigate(['consultancy/register-program'])
  }
 
  // page event
  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: event.pageIndex + 1, search: true })
    // this.search$.next(true)
  }
  // sort event
  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
    this.sorting$.next({ field: field, direction: direction })
    // this.search$.next(true)
  }
 
  deleteProgram(id: number) {
    this.consultancyService.deletePopUpState.subscribe(res => {
      if (res) {
        console.log(res)
        this.consultancyService.deleteId.next(id)
        this.consultancyService.deleteMessage.next("All the intakes of the program will be deleted. Would you like to proceed with the action?")
      }
    })
 
 
 
  }
 
  onSearch() {
    this.currentPageIndex = 0;
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, search: true, consultancyId: this.defaultData.ConsultancyId, instituteId: +this.instituteId })
  }
 
  onSession(programName: string, instituteName: string, programId: number, instituteId: number) {
    // this.consultancyService.sendProgramId.next({ programName, instituteName, programId, instituteId })
    this.router.navigate(['consultancy/session-list'])
  }
 
  onConsultancyChange(event: any) {
    console.log(event)
    this.pagination$.next({ consultancyId: event })
  }
 
  instituteSelected(event: any) {
    this.instituteId = event
  }
 
  onEditProgram() {
    this.consultancyService.editProgramCurrentPageAndPageSize.next({ pageIndex: this.defaultData.currentPage, pageSize: this.defaultData.pageSize, search: true })
  }
 
  onViewProgram() {
    this.consultancyService.editProgramCurrentPageAndPageSize.next({ pageIndex: this.defaultData.currentPage, pageSize: this.defaultData.pageSize, search: true })
  }
 
  getIntakesOfprogram(instituteId: number, instituteName: string, id: number, name: string) {
    this.consultancyService.editProgramCurrentPageAndPageSize.next({ pageIndex: this.defaultData.currentPage, pageSize: this.defaultData.pageSize, search: true })
    this.consultancyService.getIntakesOfProgam.next({ instituteId, instituteName, programId: id, programName: name })
    this.router.navigate(['/consultancy/intake-list'])
  }
 
  ngOnDestroy() {
    this.institute$.next('');
    this.consultancyService.sendInstituteId.next(null)
    this.consultancyService.programEditState.next(false)
    this.consultancyService.intakeProgramState.next(false)
    this.consultancyService.breadscrumState.next(false)
    this.adminService.consultancyProgram.next(null)
    this.adminService.consultancyInstitutePaginationState.next(false)
    // this.adminService.consultancyPaginationState.next(null)
    this.subscription.unsubscribe();
  }
}
 
