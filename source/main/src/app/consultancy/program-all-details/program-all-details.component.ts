import { Component, OnInit } from '@angular/core';
import { ProgramData } from '../consultancy-models/data.program';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-program-all-details',
  templateUrl: './program-all-details.component.html',
  styleUrls: ['./program-all-details.component.scss']
})
export class ProgramAllDetailsComponent {
  breadscrums = [
    {
      title: 'Program Details',
      items: ['Program List'],
      active: 'Program Details',
    },
  ];
  constructor(private route:ActivatedRoute, private consultancyService:ConsultancyService, private router:Router, private consultancyApiService:ConsultancyApi){}
  details:ProgramData;
  id:string
  sessions:Observable<any>;
  defaultData = this.consultancyService.defaultRenderData();
  session$:  BehaviorSubject<null|number> = new BehaviorSubject(null);
  sessionOptions = new FormControl()

  ngOnInit(){
     // for all details (on view button)
    this.details = this.route.snapshot.data['programDetails']
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.defaultData.ProgramId = String(this.id);
    
     if(this.details){
      this.sessionOptions.setValue(this.details.sessionId)
     }

    


    this.sessions = this.consultancyApiService.getProgramDetails(this.defaultData).pipe(
      map(res => {
        return [
          {
            sessionId: res['sessionId'],
            sessionName: res['sessionName']
          }
        ];
      })
    );
    
    combineLatest([this.session$]).pipe(switchMap(([sessionId])=>{
      console.log(sessionId)
      return of([])
    })).subscribe()
    
  }

  onSessionSelected(event:any){
    console.log(event.value)
    this.session$.next(event.value)
  }

  backToList(){
    this.consultancyService.showList.next(true)
    this.router.navigate(["/consultancy/program-list"]);
  }

  
}
