import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  breadscrums = [
    {
      title: 'Profile',
      items: ['Extra'],
      active: 'Profile',
    },
  ];
  user: User | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data: { user: User | null }) => {
      this.user = data.user;
      console.log('Resolved user:', this.user);
      // console.log('phone number',this.user.phoneNumber)
    });
  }
}
