import { Component } from '@angular/core';

import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstituteService } from '../institute.service';


@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})

export class InstitutionListComponent {
  constructor(private router:Router, private instituteService:InstituteService,  private cdr: ChangeDetectorRef){

  }

  displayedColumns: string[] = ['institute name', 'about institute', 'province', 'year established', 'email', 'phone', 'website', 'linkedin', 'facebook', 'actions'];
  dataSource = this.instituteService.ELEMENT_DATA;
  clickedRows = new Set<any>();
  editMode:boolean;


  // on click of plus button
  onAddNewInstitute(){
    this.router.navigate(['institute']);
  }

 

  // on click of delete button
  onDelete(index:number){
    const conf = confirm("Are you sure?");
    if(conf) {
    this.instituteService.ELEMENT_DATA.splice(index,1);
    this.dataSource = [...this.instituteService.ELEMENT_DATA]
    this.cdr.detectChanges()
    }
  }

}