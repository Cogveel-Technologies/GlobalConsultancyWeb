import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, of, startWith, Subscription, switchMap, tap, throttleTime } from 'rxjs';
import { Observable } from 'rxjs';
import { InstituteData } from '../consultancy-models/data.institute';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AdminService } from 'app/admin/admin.service';
import { SpecificConsultancyRelated } from '../consultancy-models/data.specificInstitutes';




@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})

export class InstitutionListComponent {

  breadscrums = [
    {
      title: 'Institutes',
      items: ['Consultancy'],
      active: 'Institutes',
    },
  ];

  constructor(private router: Router, public consultancyService: ConsultancyService, private consultancyApiService: ConsultancyApi, private adminService: AdminService) { }
  editMode: boolean;
  subscriptions: Subscription = new Subscription();
  universities!: Observable<InstituteData[]>;
  countries: Observable<{ countryName: string, id: number }[]>;
  country$: BehaviorSubject<number | string> = new BehaviorSubject<number | string>('');
  countryId: number;
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize?: number, pageIndex?: number, countryId?: number | string, consultancyId?: number | string, search?: boolean }> = new BehaviorSubject<{ pageSize?: number, pageIndex?: number, countryId?: number | string, consultancyId?: number | string, search?: boolean }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage, countryId: String(this.defaultData.CountryId), consultancyId: this.defaultData.ConsultancyId, search: true });
  currentPageIndex: number;
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression });
  searchTerm: string = '';
  countryList = new FormControl('all');
  consultancyList = new FormControl()
  previousCountryId: string | number;
  institutesFromConsultancy: boolean = false;
  roleName: string = localStorage.getItem('roleName');
  consultancies: Observable<[{ id: number, consultancyName: string }] | []>;





  getInstitutes(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getInstitutes(params).pipe
      (map(res => {
        console.log(res)
        this.records = res['pageInfo']['totalRecords'];
        return res['data']
      }));
  }

  ngOnInit() {
    // if showing of institute comes from consultancy list
    this.adminService.sendConsultancyId.subscribe(res => {
      if (res) {
        this.institutesFromConsultancy = true
        this.pagination$.next({ consultancyId: res, search: true, pageSize: this.defaultData.pageSize, pageIndex: 1, countryId: '' })
      }
    })
    // fetching all countries for the dropdown and displaying
    this.countries = this.consultancyApiService.getAllCountries()

    // Implementing filter on the basis of country
    this.subscriptions.add(
      combineLatest([this.searchTerm$, this.pagination$, this.sorting$]).pipe(
        throttleTime(1000, undefined, { leading: true, trailing: true }),
        distinctUntilChanged(),
        switchMap(([search, pageRelated, sort]) => {
          if (pageRelated) {
            if (pageRelated.countryId !== this.previousCountryId) {
              this.defaultData.ConsultancyId = '';
              this.previousCountryId = pageRelated.countryId;
              this.consultancies = of([]);
              this.consultancyList.setValue('');
              if (pageRelated.countryId === 'all'|| pageRelated.countryId === '') {
                console.log("if country block")
                this.defaultData.CountryId = '';
                if (this.institutesFromConsultancy) {
                  if (this.roleName === 'superadmin') {
                    this.consultancies = this.adminService.getAllConsultancies(this.defaultData);
                  }
                }
              } else {
                console.log("else country block")
                this.defaultData.CountryId = String(pageRelated.countryId);
                this.consultancies = this.adminService.getAllConsultancies(this.defaultData);
              }
            }
            if (pageRelated.consultancyId) {
              console.log("if consultancy block")
              console.log(pageRelated.consultancyId)
              this.defaultData.ConsultancyId = String(pageRelated.consultancyId);
              this.consultancyList.setValue(+pageRelated.consultancyId)
            }
            if (pageRelated.search) {
              if (this.roleName === 'superadmin') {
                this.defaultData.IsAdmin = true
              }
              if(search){
                console.log("AAAAAA")
                this.defaultData.currentPage = 1;
                this.currentPageIndex = 0;
              }else{
                this.defaultData.currentPage = pageRelated.pageIndex;
                console.log("TTTTTTT")
                this.currentPageIndex = pageRelated.pageIndex - 1;
              }

              console.log(this.defaultData)
              this.defaultData.searchText = search;
              this.defaultData.pageSize = pageRelated.pageSize;
              this.defaultData.sortExpression = sort.direction;
              this.defaultData.OrderBy = sort.field;
              // institutes of consultancy
              return this.universities = this.getInstitutes(this.defaultData);
            }
          }
          return of([]);
        })
      ).subscribe()
    );
  }

  // selection event (selection of country)
  onCountryChange(value: any) {
    console.log(value)
    this.currentPageIndex = 0;
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, countryId: value })
  }

  addInstitute() {
    this.router.navigate(['/consultancy/register-institute'])
  }

  deleteInstitute(id: number) {
    const con = confirm("Are you sure?")
    if (con) {
      this.subscriptions.add(this.consultancyApiService.deleteInstitute(id).subscribe(res => {
        this.universities = this.getInstitutes(this.defaultData)
      }));
    }
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
    this.consultancyService.countrySelected.next(this.countryId)
  }

  seePrograms(id: number, consultancyId:number) {
    this.consultancyService.sendInstituteId.next({id:id,consultancyId:consultancyId});
    this.router.navigate(['/consultancy/program-list'])
  }

  onConsultancyChange(event: any) {
    this.pagination$.next({ countryId: this.defaultData.CountryId, consultancyId: event })
  }

  onSearch() {
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, search: true, countryId: this.defaultData.CountryId })
  }

  ngOnDestroy() {
    this.consultancyService.showList.next(false);
    this.consultancyService.editOrViewPage.next(false);
    this.adminService.sendConsultancyId.next('');
    this.subscriptions.unsubscribe();
    this.institutesFromConsultancy = false;
  }

}