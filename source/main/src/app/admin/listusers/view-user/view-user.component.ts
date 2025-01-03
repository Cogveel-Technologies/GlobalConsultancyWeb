import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';
import { AdminService } from 'app/admin/admin.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  roleName: string = 'superadmin'
  breadscrums = [
    {
      title: 'Profile',
      items: ['SuperAdmin', 'Users'],
      active: 'User Details',
    },
  ];
  user: User | null = null;

  constructor(private route: ActivatedRoute, private adminService:AdminService) {}

  ngOnInit() {
    this.adminService.editorViewUserPageState.subscribe(res=>{
      if(res){
        this.adminService.editUserState.next(true)
      }
    })

    this.route.data.subscribe((data: { user: User | null }) => {
      this.user = data.user;
      console.log('Resolved user:', this.user);
      // console.log('phone number',this.user.phoneNumber)
    });
  }
}
