import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentDetails } from '../consultancy-models/data.agent';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, of, startWith, Subscription, switchMap, tap, throttleTime } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AdminService } from 'app/admin/admin.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent {
  constructor(private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService, private router: Router, private adminService: AdminService) { }

  breadscrums = [
    {
      title: 'Agents',
      items: ['Consultancy'],
      active: 'Agents',
    },
  ];


  getAgents(params: ConsultancyDetailsOptions) {
    return this.consultancyApiService.getAgents(params).pipe
      (map(res => {
        this.records = res['pageInfo']['totalRecords'];
        console.log(res['data'])
        return res['data']
      }));
  }
  agents: Observable<AgentDetails[]>;
  subscription: Subscription = new Subscription();
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{ pageSize?: number, pageIndex?: number, consultancyId?: string, search?: boolean }> = new BehaviorSubject<{ pageSize?: number, pageIndex?: number, consultancyId?: string, search?: boolean }>({ pageSize: this.defaultData.pageSize, pageIndex: this.defaultData.currentPage, search: true });
  sorting$: BehaviorSubject<{ field: string, direction: string }> = new BehaviorSubject<{ field: string, direction: string }>({ field: this.defaultData.OrderBy, direction: this.defaultData.sortExpression });
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  currentPageIndex: number;
  roleName = localStorage.getItem("roleName")
  consultancyControl = new FormControl('all');
  consultancies: Observable<[{ id: number, consultancyName: string }]>|any;
 


  ngOnInit() {
    if (this.roleName === 'superadmin') {
      this.defaultData.IsAdmin = true
      this.adminService.getAllConsultancies(this.defaultData).pipe(map(res => {
        res = [{ id: 'all', consultancyName: 'All' }, ...res]
        return res
      })).subscribe(res => {
        console.log(res)
        this.consultancies = res
      });
      this.agents = this.getAgents(this.defaultData)
      console.log("PPPPPPP")
    } else {
      this.agents = this.getAgents(this.defaultData)
      console.log("HHHHHHHHH")
    }

    this.agents = combineLatest([this.searchTerm$, this.pagination$, this.sorting$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(), switchMap(([search, pageRelated, sort]) => {
        if (pageRelated.consultancyId && this.roleName === 'superadmin') {
          if(pageRelated.consultancyId === 'all'){
            this.defaultData.ConsultancyId = ''
          }else{
            this.defaultData.ConsultancyId = pageRelated.consultancyId;
          }
        }
        if (pageRelated.search) {
          if (search) {
            this.defaultData.currentPage = 1;
            this.currentPageIndex = 0;
          } else {
            this.defaultData.currentPage = pageRelated.pageIndex;
            this.currentPageIndex = pageRelated.pageIndex - 1;
          }
          this.defaultData.searchText = search;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field
          console.log(this.defaultData)
          return this.getAgents(this.defaultData)
        }
        return of()
      }))
  }

  deleteAgent(id: number) {
    const con = confirm("Are you sure?")
    if (con) {
      this.subscription.add(this.consultancyApiService.deleteAgent(id).subscribe(() => {
        this.agents = this.getAgents(this.defaultData)
      }))
    }
  }


  // page event
  onPageChange(event: PageEvent) {
    this.currentPageIndex = event.pageIndex;
    this.pagination$.next({ pageSize: event.pageSize, pageIndex: event.pageIndex + 1, search: true })
  }

  // sort event
  onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
    this.sorting$.next({ field: field, direction: direction })
  }

  addAgent() {
    this.router.navigate(["consultancy/register-agent"])
  }

  onConsultancyChange(event: any) {
    this.pagination$.next({ consultancyId: event })
  }

  onSearch() {
    this.pagination$.next({ pageSize: this.defaultData.pageSize, pageIndex: 1, search: true })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }


}
