import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentDetails } from '../consultancy-models/data.agent';

@Component({
  selector: 'app-agent-all-details',
  templateUrl: './agent-all-details.component.html',
  styleUrls: ['./agent-all-details.component.scss']
})
export class AgentAllDetailsComponent {
  breadscrums = [
    {
      title: 'Agent Details',
      items: ['Agent List'],
      active: 'Agent Details',
    },
  ];
  constructor(private route:ActivatedRoute){}
  details:AgentDetails
  keys:any
  ngOnInit(){
     // for all details (on view button)
     this.details = this.route.snapshot.data['agentDetails']

     this.keys = Object.keys(this.details);
     console.log(this.keys)
  }
}
