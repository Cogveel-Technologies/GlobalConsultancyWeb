import { Component, OnInit } from '@angular/core';
import { IntakeService } from '../consultancy-services/intake.service';

@Component({
  selector: 'app-intakes-list',
  templateUrl: './intakes-list.component.html',
  styleUrls: ['./intakes-list.component.scss']
})
export class IntakesListComponent {
  breadscrums = [
    {
      title: 'Intake List',
      items: ['Consultancy'],
      active: 'Intake List',
    },
  ];
  constructor(private intakeService:IntakeService){}
  intakes!:any

  // get all data
  ngOnInit(){
    this.intakes = this.intakeService.getIntakeData()
  }

  addProgram(){}

  deleteUser(){}

}
