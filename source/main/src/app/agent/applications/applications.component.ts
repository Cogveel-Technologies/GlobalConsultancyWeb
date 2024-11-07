import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AgentService } from '../agent.service';
@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  isLinear = false;
  HFormGroup1?: UntypedFormGroup;
  HFormGroup2?: UntypedFormGroup;

  breadscrums = [
    {
      title: 'Student Application',
      items: ['Search'],
      active: 'Application',
    },
  ];
  selectedRecord: any;

  constructor(private _formBuilder: UntypedFormBuilder, private agentService: AgentService) {}
  ngOnInit() {
    this.selectedRecord = this.agentService.getSelectedRecord();
    console.log(this.selectedRecord,'appliactionsssssssss')

    this.HFormGroup1 = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.HFormGroup2 = this._formBuilder.group({
      address: ['', Validators.required],
    });

   
  }
}
