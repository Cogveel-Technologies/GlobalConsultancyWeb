import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultancyData } from '../consultancy-models/data.consultancy';

@Component({
  selector: 'app-consultancy-all-details',
  templateUrl: './consultancy-all-details.component.html',
  styleUrls: ['./consultancy-all-details.component.scss']
})
export class ConsultancyAllDetailsComponent {

  breadscrums = [
    {
      title: 'Consultancy Details',
      items: ['Consultancy'],
      active: 'Consultancy Details',
    },
  ];
  constructor(private route:ActivatedRoute){}
  details:any;
  keys:any
  ngOnInit(){
    // receive data from resolver
    this.details = this.route.snapshot.data['consultancyDetails'];

    // transform the object into array
     this.keys = Object.keys(this.details);
    
  }
}
