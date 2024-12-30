import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, of, startWith, Subscription, switchMap, tap, throttleTime, toArray } from 'rxjs';
import { Observable } from 'rxjs';
import { InstituteData } from '../consultancy-models/data.institute';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from 'app/admin/admin.service';




@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})

export class InstitutionListComponent {

  breadscrums: { title: string; items: string[]; active: string; activeRoute: string }[];
  constructor(private router: Router, public consultancyService: ConsultancyService, private consultancyApiService: ConsultancyApi, private adminService: AdminService, private activeRoute: ActivatedRoute) {
    this.breadscrums = [
      {
        title: 'Institutes',
        items: ['Consultancy'],
        active: 'Institutes',
        activeRoute: `${this.router.url}`
      },
    ];
  }


  editMode: boolean;
  subscriptions: Subscription = new Subscription();
  universities!: Observable<InstituteData[]> | Observable<[]>;
  countries: Observable<{ countryName: string, id: number | string }[]> | any;
  country$: BehaviorSubject<number | string> = new BehaviorSubject<number | string>('');
  countryId: number | string = '';
  countryName: string;
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize?: number | string, pageIndex?: number | string, countryId?: number | string, consultancyId?: number | string, search?: boolean }> = new BehaviorSubject<{ pageSize?: number, pageIndex?: number, countryId?: number | string, consultancyId?: number | string, search?: boolean }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage, countryId: String(this.defaultData.CountryId), consultancyId: this.defaultData.ConsultancyId, search: true });
  currentPageIndex: number;
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression });
  searchTerm: string = '';
  countryList = new FormControl();
  consultancyList = new FormControl()
  previousCountryId: string | number = '';
  institutesFromConsultancy: boolean = false;
  roleName: string = localStorage.getItem('roleName');
  consultancies: Observable<[{ id: number, consultancyName: string }] | []> | any;
  selectedCountryName: string = ''; // To display the country name in the input field
  selectedCountryId: string = '';
  filteredCountries: { id: number, countryName: string }[];
  instituteConsultancyInputData: string | null = null;
  instituteCountry: string;
  consultancyName: string;
  instituteEditState: boolean = false;
  instituteSessionState: boolean = false;
  instituteProgramState: boolean = false;
  mainRoute: string
  deleteId: number



  getInstitutes(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getInstitutes(params).pipe(
      tap(res => {
        if ((!res['data'] || res['data'].length === 0) && params.currentPage > 1) {
          console.log("Condition met: No data and currentPage > 1");
          this.pagination$.next({ pageIndex: this.defaultData.currentPage - 1, pageSize: this.defaultData.pageSize, countryId: this.defaultData.CountryId, search: true });
        }
      }),
      filter(res => !((!res['data'] || res['data'].length === 0) && params.currentPage > 1)),
      map(res => {
        console.log(res);
        this.records = res['pageInfo']['totalRecords'];
        return res['data'];
      })
    );
  }


  ngOnInit() {
    this.mainRoute = this.router.url;

    this.consultancyService.activeRoute.next(this.mainRoute)

    // delete
    this.consultancyService.sendDeleteIdtoPC.subscribe(res => {
      if (res) {
        this.subscriptions.add(this.consultancyApiService.deleteInstitute(res).subscribe(() => {
          this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage, countryId: this.defaultData.CountryId, search: true })
          this.consultancyService.sendDeleteIdtoPC.next(null)
        }));
      }
    })

    // if user navigates back (using breadscrum)
    this.consultancyService.breadscrumState.subscribe(res => {
      if (res) {
        this.consultancyService.editInstituteCurrentPageAndPageSize.subscribe(res => {
          this.pagination$.next(res)
        })
      }
    })

    //institueEditState
    this.consultancyService.instituteEditState.subscribe(res => this.instituteEditState = res)

    this.adminService.consultancyInstitutePaginationState.subscribe(res => {
      if (res) {
        this.adminService.consultancyInstituteState.next(true)
      }
    })

    // institute session state
    this.consultancyService.instituteSessionState.subscribe(res => {
      console.log(res)
      this.instituteSessionState = res
    })


    // institute program state
    this.consultancyService.instituteProgramState.subscribe(res => {
      this.instituteProgramState = res
    })

    if (this.instituteSessionState || this.instituteProgramState) {
      console.log("enetterererere")
      this.consultancyService.editInstituteCurrentPageAndPageSize.subscribe(res => {
        console.log("Mmmm")
        console.log(res)
        this.pagination$.next(res)
      })
    }

    // if user navigates back from edit or view page
    if (this.instituteEditState) {
      this.consultancyService.editInstituteCurrentPageAndPageSize.subscribe(res => {
        console.log("Mmmm")
        console.log(res)
        this.pagination$.next(res)
      })
    }

    // if showing of institute comes from consultancy list
    this.consultancyService.consultancyInstitutes.subscribe(res => {
      if (res) {
        console.log(res)
        this.consultancyName = res.consultancyName;
        this.instituteCountry = res.countryName;
        this.institutesFromConsultancy = true
        this.pagination$.next({ consultancyId: res.consultancyId, search: true, pageSize: this.defaultData.pageSize, pageIndex: 1, countryId: '' })
      }
    })


    // fetching all countries for the dropdown and displaying
    this.consultancyApiService.getAllCountries().pipe(map(res => {
      console.log(res)
      const allOption = [{ id: 'all', countryName: 'All' }, ...res]
      return allOption
    })).subscribe(res => {
      this.countries = res
    })

    // Implementing filter on the basis of country

    this.universities = combineLatest([this.searchTerm$, this.pagination$, this.sorting$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([search, pageRelated, sort]) => {
        if (pageRelated) {
          console.log(pageRelated.countryId)
          console.log(this.previousCountryId)
          if (+pageRelated.countryId !== +this.previousCountryId) {
            console.log("ppppp")
            this.defaultData.ConsultancyId = '';
            this.previousCountryId = pageRelated.countryId;
            this.consultancies = of([]);
            this.selectedCountryName = '';
            if (pageRelated.countryId === 'all' || pageRelated.countryId === '') {
              this.consultancies = [];
              this.defaultData.CountryId = '';
              if (this.institutesFromConsultancy) {
                if (this.roleName === 'superadmin') {
                  console.log("super adminnnnn")
                  this.consultancies = this.adminService.getAllConsultancies(this.defaultData);
                }
              }
            } else {
              this.instituteConsultancyInputData = ''
              this.defaultData.CountryId = String(pageRelated.countryId);
              console.log(this.defaultData)
              this.adminService.getAllConsultancies(this.defaultData).subscribe(res => {
                this.consultancies = res
              })
            }
          }
          if (pageRelated.consultancyId) {
            console.log("if consultancy block")
            console.log(pageRelated.consultancyId)
            this.defaultData.CountryId = '';
            this.defaultData.ConsultancyId = String(pageRelated.consultancyId);
          }
          if (pageRelated.search) {
            if (this.roleName === 'superadmin') {
              this.defaultData.IsAdmin = true
            }
            if (search) {
              console.log("AAAAAA")
              this.defaultData.currentPage = 1;
              this.currentPageIndex = 0;
            } else {
              this.defaultData.currentPage = +pageRelated.pageIndex;
              console.log("TTTTTTT")
              this.currentPageIndex = +pageRelated.pageIndex - 1;
            }

            console.log(this.defaultData)
            this.defaultData.searchText = search;
            this.defaultData.pageSize = +pageRelated.pageSize;
            this.defaultData.sortExpression = sort.direction;
            this.defaultData.OrderBy = sort.field;
            return this.getInstitutes(this.defaultData);
          }
        }
        return of();
      })
    )
  }

  addInstitute() {
    this.router.navigate(['/consultancy/register-institute'])
  }

  deleteInstitute(id: number) {
    this.consultancyService.deletePopUpState.subscribe(res => {
      if (res) {
        this.consultancyService.deleteId.next(id);
        this.consultancyService.deleteMessage.next("All the programs, sessions, and intakes of the institute will be deleted. Would you like to proceed with the action?")
      }
    })
  }

  // page event
  onPageChange(event: PageEvent) {
    console.log(event)
    this.currentPageIndex = event.pageIndex;
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1, countryId: this.defaultData.CountryId, search: true })
  }


  // sort event
  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
    this.sorting$.next({ field: field, direction: direction })
  }

  onView() {
    this.consultancyService.countrySelected.next(+this.countryId)
  }

  institutePrograms(id: number, instituteName: string, consultancyId: number) {
    this.consultancyService.sendInstituteId.next({ id, instituteName, consultancyId });
    this.router.navigate(['/consultancy/program-list'])
    this.consultancyService.instituteProgramState.next(true)
    this.onEditorViewInstitute()
  }

  instituteSession(id: number, name: string) {
    this.consultancyService.getSessionsOfInstitute.next({ instituteId: id, instituteName: name })
    this.router.navigate(['/consultancy/session-list'])
    this.consultancyService.instituteSessionState.next(true)
    this.consultancyService.instituteSessions.next(true)
    this.onEditorViewInstitute()
  }

  onConsultancyChange(event: any) {
    this.pagination$.next({ countryId: this.defaultData.CountryId, consultancyId: event })
  }

  onEditorViewInstitute() {
    console.log("TTT")
    this.consultancyService.editInstituteCurrentPageAndPageSize.next({ pageIndex: this.defaultData.currentPage, pageSize: this.defaultData.pageSize, search: true, countryId: this.defaultData.CountryId })
  }

  onSearch() {
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, search: true, countryId: this.countryId })
  }

  countrySelected(event: any) {
    this.countryId = event
    if (this.roleName === 'superadmin') {
      this.pagination$.next({ countryId: this.countryId })
    }
  }


  ngOnDestroy() {
    this.consultancyService.instituteEditState.next(false)
    this.consultancyService.showList.next(false);
    this.consultancyService.editOrViewPage.next(false);
    this.adminService.sendConsultancyId.next('');
    this.subscriptions.unsubscribe();
    this.institutesFromConsultancy = false;
    this.consultancyService.consultancyInstitutes.next(null)
    this.consultancyService.instituteSessionState.next(false)
    this.consultancyService.instituteProgramState.next(false)
    this.adminService.consultancyProgramPaginationState.next(false)
    this.consultancyService.breadscrumState.next(false)
  }

}