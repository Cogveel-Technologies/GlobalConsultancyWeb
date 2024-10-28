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

  constructor(private router: Router, public consultancyService: ConsultancyService, private consultancyApiService: ConsultancyApi) { }
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
  pagination$: BehaviorSubject<{ pageSize: number, pageIndex: number, countryId?: number | string }> = new BehaviorSubject<{ pageSize: number, pageIndex: number, countryId?: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage, countryId: +this.defaultData.CountryId });
  currentPageIndex: number;
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression });
  searchTerm: string = '';
  countryList = new FormControl('all');
  previousCountryId: string | number;


  getInstitutes(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getInstitutes(params).pipe
      (map(res => {
        console.log(res)
        this.records = res['pageInfo']['totalRecords'];
        return res['data']
      }));
  }

  ngOnInit() {
    // fetching all countries for the dropdown and displaying
    this.countries = this.consultancyApiService.getAllCountries()

    // Implementing filter on the basis of country
    this.subscriptions.add(
      combineLatest([this.searchTerm$, this.pagination$, this.sorting$]).pipe(
        throttleTime(1000, undefined, { leading: true, trailing: true }),
        distinctUntilChanged(),
        switchMap(([search, pageRelated, sort]) => {
          console.log(this.currentPageIndex)
          if (pageRelated) {
            console.log(pageRelated)
            if (pageRelated.countryId && typeof pageRelated.countryId === 'string') {
              this.defaultData.CountryId = ''
            } else if (pageRelated.countryId && typeof pageRelated.countryId === 'number') {
              this.defaultData.CountryId = String(pageRelated.countryId);
            }
            this.defaultData.searchText = search;
            this.defaultData.pageSize = pageRelated.pageSize;
            this.defaultData.currentPage = pageRelated.pageIndex;
            console.log(this.defaultData.currentPage)
            this.defaultData.sortExpression = sort.direction;
            this.defaultData.OrderBy = sort.field;
            console.log(this.defaultData)
            return this.universities = this.getInstitutes(this.defaultData).pipe(tap(res => console.log(res)));
          } else {
            return of([]);
          }
        })
      ).subscribe()
    );
  }

  // selection event (selection of country)
  onCountryChange(value: any) {
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
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1 })
  }


  // sort event
  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
    this.sorting$.next({ field: field, direction: direction })
  }

  onView() {
    this.consultancyService.countrySelected.next(this.countryId)
  }

  seePrograms(id: number) {
    this.consultancyService.sendInstituteId.next(id);
    this.router.navigate(['/consultancy/program-list'])
  }

  ngOnDestroy() {
    this.consultancyService.showList.next(false)
    this.consultancyService.editOrViewPage.next(false)
    this.subscriptions.unsubscribe();
  }

}