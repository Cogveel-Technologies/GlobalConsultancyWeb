import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consultancy } from '../consultancy.model';
import { AdminService } from 'app/admin/admin.service';

@Component({
  selector: 'app-view-consultancy',
  templateUrl: './view-consultancy.component.html',
  styleUrls: ['./view-consultancy.component.scss'],
})
export class ViewConsultancyComponent implements OnInit {
  breadscrums = [
    {
      title: 'Consultancy Details',
      items: ['Consultancy','Consultancy List'],
      active: 'Consultancy Details',
    },
  ];
  consultancy: Consultancy | null = null;

  constructor(private route: ActivatedRoute, private adminService:AdminService) {}

  ngOnInit() {
    this.adminService.consultancyPaginationState.subscribe(res =>{
      if(res){
        this.adminService.consultancyPageState.next(true)
      }
    })

    this.route.data.subscribe((data: { consultancy: Consultancy | null }) => {
      this.consultancy = data.consultancy;
      console.log('Resolved consultancy:', this.consultancy);
    });
  }
}
