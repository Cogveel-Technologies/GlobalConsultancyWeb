import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consultancy } from '../consultancy.model';

@Component({
  selector: 'app-view-consultancy',
  templateUrl: './view-consultancy.component.html',
  styleUrls: ['./view-consultancy.component.scss'],
})
export class ViewConsultancyComponent implements OnInit {
  breadscrums = [
    {
      title: 'Consultancy Profile',
      items: ['Consultancies'],
      active: 'Profile',
    },
  ];
  consultancy: Consultancy | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { consultancy: Consultancy | null }) => {
      this.consultancy = data.consultancy;
      console.log('Resolved consultancy:', this.consultancy);
    });
  }
}
