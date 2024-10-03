import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-no-data-found',
  templateUrl: './no-data-found.component.html',
  styleUrls: ['./no-data-found.component.scss']
})
export class NoDataFoundComponent {
  constructor(private router:Router){}
  backToList(){
    this.router.navigate(["dashboard"]);
  }
}
