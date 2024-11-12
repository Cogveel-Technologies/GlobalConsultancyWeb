import { Component, OnInit } from '@angular/core';
import { ProgramData } from '../consultancy-models/data.program';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { BehaviorSubject, combineLatest, Observable, of, switchMap } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { FormControl } from '@angular/forms';
import { AdminService } from 'app/admin/admin.service';


@Component({
  selector: 'app-program-all-details',
  templateUrl: './program-all-details.component.html',
  styleUrls: ['./program-all-details.component.scss']
})
export class ProgramAllDetailsComponent {
  breadscrums = [
    {
      title: 'Program Details',
      items: ['Consultancy', 'Programs'],
      active: 'Program Details',
    },
  ];
  constructor(private route: ActivatedRoute, private consultancyService: ConsultancyService, private router: Router, private consultancyApiService: ConsultancyApi, private adminService: AdminService) { }
  details: ProgramData;
  id: string
  sessions: Observable<any>;
  defaultData = this.consultancyService.defaultRenderData();
  session$: BehaviorSubject<null | number> = new BehaviorSubject(null);
  previousSessionId: number = 0;
  sessionOptions = new FormControl()
  editMode: boolean = false;

  ngOnInit() {
    // for all details (on view button)
    this.details = this.route.snapshot.data['programDetails']
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.defaultData.ProgramId = String(this.id);


    // this.sessions = this.consultancyApiService.getProgramSessions(this.defaultData).pipe(tap(res=>{
    //   console.log(res[0].id)
    //   this.sessionOptions.setValue(res[0].id)
    // }))

    combineLatest([this.session$]).pipe(switchMap(([sessionId]) => {
      if (sessionId && this.previousSessionId !== sessionId) {

      }
      console.log(sessionId)
      return of([])
    })).subscribe()

  }

  onSessionSelected(event: any) {
    console.log(event.value)
    this.session$.next(event.value)
  }

  onDeleteDocument() {
    const con = confirm("Are you sure?")
    if (con) {
      let id: number;
      this.adminService.deleteDocument(id)
    }
  }

  onEditDocument() {
    this.editMode = true;
  }

  onUpdate(){

  }

  onCancelEdit(){
    console.log("hello")
    this.editMode = false;
  }

  backToList() {
    this.consultancyService.showList.next(true)
    this.router.navigate(["/consultancy/program-list"]);
  }

}
