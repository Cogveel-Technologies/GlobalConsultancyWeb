import { Component, OnInit } from '@angular/core';
import { SessionService } from '../consultancy-services/session.service';
import { SessionData } from '../consultancy-models/data.session';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent {
  breadscrums = [
    {
      title: 'Session List',
      items: ['Programs'],
      active: 'Session List',
    },
  ];
  constructor(private sessionService:SessionService){}
  sessions:any;
  ngOnInit(){
    this.sessions = this.sessionService.getAllSessions()
  }
}
