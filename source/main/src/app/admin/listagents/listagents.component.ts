

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listagents',
  templateUrl: './listagents.component.html',
  styleUrls: ['./listagents.component.scss']
})
export class ListagentsComponent implements OnInit {
  
  breadscrums = [
    {
      title: 'Admin Agents List',
      items: ['Tables'],
      active: 'Agents',
    },
  ];

  constructor( ){}
  

  ngOnInit() {
   
    };

   
    
  }

  