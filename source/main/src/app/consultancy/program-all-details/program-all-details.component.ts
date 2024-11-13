import { Component, OnInit } from '@angular/core';
import { ProgramData } from '../consultancy-models/data.program';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { BehaviorSubject, combineLatest, map, Observable, of, switchMap, tap } from 'rxjs';
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
  documentTypes:any;
  editModeMap: Map<number, boolean> = new Map();
  documentName = new FormControl('')

  getDocumentTypes(){
    return this.consultancyApiService.getDocumentsOfProgram(+this.id).pipe(
      map(res => {
        const data = res['data'];
        console.log(data);
        return data.map((item: any) => ({
          id: item.id,
          documentType: item.documentType
        }));
      })
    );
  }

  ngOnInit() {
    // for all details (on view button)
    this.details = this.route.snapshot.data['programDetails']
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.defaultData.ProgramId = String(this.id);

    
    this.documentTypes = this.getDocumentTypes()



    // this.sessions = this.consultancyApiService.getProgramSessions(this.defaultData).pipe(tap(res=>{
    //   console.log(res[0].id)
    //   this.sessionOptions.setValue(res[0].id)
    // }))

  }

  onSessionSelected(event: any) {
    console.log(event.value)
    this.session$.next(event.value)
  }

  onDeleteDocument(id:number) {
    const con = confirm("Are you sure?")
    if (con) {
      this.adminService.deleteDocument(id).subscribe(res=>{
        this.documentTypes = this.getDocumentTypes();
      })
    }
  }

  onEditDocument(id:number,docType:string) {
    this.documentName.setValue(docType)
    this.editModeMap.set(id, true);
  }

  onUpdate(id:number){
    const updatedDetails = {
      id,
      documentType: this.documentName.value
    }
     this.adminService.updateDocument(id,updatedDetails).subscribe(res=>{

      this.documentTypes = this.adminService.getDocuments().pipe(
        map(res => {
          const data = res['data'];
          console.log(data);
          return data.map((item: any) => ({
            id: item.id,
            documentType: item.documentType
          }));
        }),tap(res=> this.editModeMap.set(id,false))
      );
     })
  }

  onCancelEdit(id:number){
    this.editModeMap.set(id, false);
  }

  backToList() {
    this.consultancyService.showList.next(true)
    this.router.navigate(["/consultancy/program-list"]);
  }

}
