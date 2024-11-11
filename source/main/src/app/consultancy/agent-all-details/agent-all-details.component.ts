import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      items: ['Consultancy','Agents'],
      active: 'Agent Details',
    },
  ];
  constructor(private route:ActivatedRoute, private router:Router){}
  details:AgentDetails
  keys:any
  ngOnInit(){
     // for all details (on view button)
     this.details = this.route.snapshot.data['agentDetails']

     this.keys = Object.keys(this.details);
     console.log(this.keys)
  }
  backToList(){
    this.router.navigate(["/consultancy/agent-list"]);
  }
}
