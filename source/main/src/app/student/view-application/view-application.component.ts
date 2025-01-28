import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { AgentService } from 'src/app/services/agent.service';
import { AgentService } from 'app/agent/agent.service';
import { ApplicationModel } from 'app/agent/models/applicationModel';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';


@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss']
})
export class ViewApplicationComponent implements OnInit {
  // breadscrums = [
  //   {
  //     title: 'Application List',
  //     items: ['Student', 'My Applications'],
  //     active: 'View Application',
  //     activeRoute: `${this.router.url}`
      
  //   },
  // ];
  breadscrums = [
    {
      title: 'Application List',
      items: [
        { label: 'Student', route: 'student' },
        { label: 'My Applications', route: 'student/my-applications' },
      ],
      active: 'View Application',
    },
  ];
  
 
  applicationId!: number;
  applicationDetails: any;
  mainRoute: string
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
     private  consultancyService: ConsultancyService
  ) {}

  ngOnInit(): void {
    // for breadcrum route
    this.mainRoute = this.router.url;
    

    this.consultancyService.activeRoute.next(this.mainRoute)
    // Extract applicationId from query parameters
    this.route.queryParams.subscribe(params => {
      this.applicationId = +params['id']; // Convert to number
      if (this.applicationId) {
        this.fetchApplicationDetails(this.applicationId);
      }
    });
  }

  // Call the API to fetch application details
  fetchApplicationDetails(applicationId: number): void {
    this.agentService.getApplicationById(applicationId).subscribe({
      next: (details) => {
        this.applicationDetails = details;
        console.log('Application Details:', this.applicationDetails);
      },
      error: (err) => {
        console.error('Error fetching application details:', err);
      }
    });
  }
  goBack(){

  }
  deleteApplication(){
    
  }
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
  
}
