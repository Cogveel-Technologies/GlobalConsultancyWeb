import { Component, OnInit } from '@angular/core';
import { ProgramData } from '../consultancy-models/data.program';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultancyService } from '../consultancy-services/consultancy.service';

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
  constructor(private route:ActivatedRoute, private consultancyService:ConsultancyService, private router:Router){}
  details:ProgramData;
  keys:any;

  ngOnInit(){
     // for all details (on view button)
     this.details = this.route.snapshot.data['programDetails']
     this.keys = Object.keys(this.details);
     console.log(this.details)
  }

  backToList(){
    this.consultancyService.showList.next(true)
    this.router.navigate(["/consultancy/program-list"]);
  }
}
