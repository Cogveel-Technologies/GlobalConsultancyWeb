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
  consultancyId: string = localStorage.getItem("id")
  universities!: Observable<InstituteData[]>;
  countrySelected: boolean = false;
  countryListForm: FormGroup;
  countries: Observable<{ countryName: string, id: number }[]>;
  country$: BehaviorSubject<number|null> = new BehaviorSubject<number | null>(null);
  countryId: number;
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize: number, pageIndex: number }> = new BehaviorSubject<{ pageSize: number, pageIndex: number }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage });
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  sorting$: BehaviorSubject<{field:string,direction:string}>= new BehaviorSubject<{field:string,direction:string}>({field:this.defaultData.OrderBy,direction:this.defaultData.sortExpression});
  currentPageIndex:number;


  getInstitutes(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getInstitutes(params).pipe
      (map(res => {
        console.log(res)
        this.records = res['pageInfo']['totalRecords'];
        return res['data']
      }));
  }

  ngOnInit() {
    this.countryListForm = new FormGroup({
      countryList: new FormControl(),
    })

    
    // fetching all countries for the dropdown
    this.countries = this.consultancyApiService.getAllCountries().pipe(tap(res => {
      // this.search$.next(true);
      this.country$.next(res[0]['id']);
      this.countryListForm.get('countryList').setValue(res[0]['id']);
    }));
  

    
    

  // Implementing filter on the basis of country
  this.subscriptions.add(
    combineLatest([this.country$, this.searchTerm$, this.pagination$, this.sorting$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(),
      switchMap(([id, search, pageRelated, sort]) => {
        if (id) {
          this.countryId = id
          this.defaultData.CountryId = String(id);
          this.defaultData.searchText = search;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.currentPage = pageRelated.pageIndex;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field;
          console.log(this.defaultData)
          this.universities = this.getInstitutes(this.defaultData);

          // Set the FormControl value for countryList
          this.countryListForm.get('countryList').setValue(id); // Set the value of the dropdown
          return of(id);
        } else {
          return of([]);
        }
      })
    ).subscribe()
  );

  }

  // selection event (selection of country)
  onCountryChange(value: any) {
    this.country$.next(value);
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
    this.currentPageIndex = event.pageIndex;
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1 })
  }


     // sort event
     onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
      this.sorting$.next({field:field,direction:direction})
    }

    onView(){
      this.consultancyService.countrySelected.next(this.countryId)
    }

  ngOnDestroy() {
    this.consultancyService.showList.next(false)
    this.consultancyService.editOrViewPage.next(false)
    this.subscriptions.unsubscribe();
  }

}