import { Component,OnInit } from '@angular/core';
import { InstituteData } from '../consultancy-models/data.institute';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-institute-all-details',
  templateUrl: './institute-all-details.component.html',
  styleUrls: ['./institute-all-details.component.scss']
})
export class InstituteAllDetailsComponent {
  breadscrums = [
    {
      title: 'Institute Details',
      items: ['Consultancy'],
      active: 'Institute Details',
    },
  ];
  constructor(private route:ActivatedRoute){}
  details:InstituteData
  keys:any
  ngOnInit(){
     // for all details (on view button)
     this.details = this.route.snapshot.data['instituteDetails']

     this.keys = Object.keys(this.details);
  }
}
