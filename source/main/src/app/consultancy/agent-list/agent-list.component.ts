import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentDetails } from '../consultancy-models/data.agent';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, of, startWith, Subscription, switchMap, tap, throttleTime } from 'rxjs';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent {
  constructor(private consultancyApiService: ConsultancyApi, public consultancyService: ConsultancyService, private router:Router) { }

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
        return res['data']
      }));
  }
  agents: Observable<AgentDetails[]>;
  subscription:Subscription = new Subscription();
  defaultData:ConsultancyDetailsOptions = {...this.consultancyService.defaultRenderData()};
  search = new FormControl();
  searchTerm$ = this.search.valueChanges.pipe(startWith(''));
  records: number;
  pagination$: BehaviorSubject<{pageSize:number,pageIndex:number}> = new BehaviorSubject<{pageSize:number,pageIndex:number}>({pageSize:this.defaultData.pageSize, pageIndex:this.defaultData.currentPage});
  sorting$: BehaviorSubject<{field:string,direction:string}>= new BehaviorSubject<{field:string,direction:string}>({field:this.defaultData.OrderBy,direction:this.defaultData.sortExpression});
  totalRecords$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(this.defaultData.currentPage);
  currentPageIndex:number;


  ngOnInit() {
    this.defaultData.ConsultancyId = localStorage.getItem("id")
    this.agents = this.getAgents(this.defaultData)

    this.subscription.add(combineLatest([this.searchTerm$, this.pagination$, this.sorting$]).pipe(
      throttleTime(1000, undefined, { leading: true, trailing: true }),
      distinctUntilChanged(), switchMap(([ search, pageRelated, sort]) => {
          this.defaultData.searchText = search;
          this.defaultData.pageSize = pageRelated.pageSize;
          this.defaultData.currentPage = pageRelated.pageIndex;
          this.defaultData.sortExpression = sort.direction;
          this.defaultData.OrderBy = sort.field
          console.log(this.defaultData)
          return this.agents = this.getAgents(this.defaultData)
      })).subscribe())
  }

  deleteAgent(id:number){
    const con = confirm("Are you sure?")
    if(con){
      this.subscription.add(this.consultancyApiService.deleteAgent(id).subscribe(()=>{
        this.agents = this.getAgents(this.defaultData)
      }))
    }
  }

  
    // page event
    onPageChange(event: PageEvent) {
      this.currentPageIndex = event.pageIndex;
      this.pagination$.next({pageSize:event.pageSize,pageIndex:event.pageIndex+1})
    }
  
      // sort event
      onSortChange({ field, direction }: { field: string, direction: 'asc' | 'desc' | string }) {
        this.sorting$.next({field:field,direction:direction})
      }

    addAgent(){
      this.router.navigate(["consultancy/register-agent"])
    }


  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  
}
