import { Component,OnInit } from '@angular/core';
import { InstituteData } from '../consultancy-models/data.institute';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-institute-all-details',
  templateUrl: './institute-all-details.component.html',
  styleUrls: ['./institute-all-details.component.scss']
})
export class InstituteAllDetailsComponent {
  breadscrums = [
    {
      title: 'Institute Details',
      items: ['Consultancy','Institutes'],
      active: 'Institute Details',
    },
  ];
  constructor(private route:ActivatedRoute, private router:Router, private consultancyApi:ConsultancyApi, private consultancyService:ConsultancyService){};
  details:InstituteData;
  keys:any;
  countryId:number
  defaultData:ConsultancyDetailsOptions;
  instituteId:{id:number,name:string};
    ngOnInit(){
      
    this.defaultData = this.consultancyService.defaultRenderData()
     // for all details (on view button)
     this.details = this.route.snapshot.data['instituteDetails']
     console.log(this.details)
     this.keys = Object.keys(this.details);
     this.instituteId = {id:this.details.id, name:this.details.instituteName};
  }

  showProgams(){
    this.router.navigate(["/consultancy/program-list"]);
  }

  backToList(){
    this.consultancyService.instituteEditState.next(true)
    this.consultancyService.showList.next(true);
    this.consultancyService.countrySelected.next(this.countryId)
    this.consultancyService.editOrViewPage.next(true)
    this.router.navigate(["/consultancy/institution-list"]);
  }
}
