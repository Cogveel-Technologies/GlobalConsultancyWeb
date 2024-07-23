import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS
import { AdminService } from '../admin.service';
import { User } from './user.model';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.scss']
})
export class ListusersComponent implements OnInit {

  breadscrums = [
    {
      title: 'Users List',
      items: ['Tables'],
      active: 'Admin Users',
    },
  ];
  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data: { users: User[] }) => {
      this.users = data.users;
      this.filteredUsers = [...this.users];
    });
  }

  addUser() {
    console.log("Add user button clicked");
    this.router.navigate(['/admin/adminusers']);
  }

  
  refreshPage() {
    console.log("Refresh button clicked");
    // Reload the current route
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate(['/admin/listusers']).then(() => {
      window.location.reload();
    });
  }

  deleteUser(userId: number) {
    console.log(`Delete user button clicked for user ${userId}`);
    this.adminService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log('User deleted successfully', response);
        // Reload users after deletion (if needed)
      },
      error: (error) => {
        console.error('Error deleting user', error);
      }
    });
  }

  encryptData(data: any): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');  // Your secret key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // Initialization vector
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
    return encrypted.toString();
  }

  editUser(userId: number) {
    const edit = this.users.find(el => el.id === userId);
    if (edit) {
      const encryptedData = this.encryptData(edit);
      this.router.navigate(['/admin/adminusers'], {
        queryParams: {
          data: encryptedData
        }
      });
    }
  }

  filterUsers(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsers = [...this.users];
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user =>
        user.firstName.toLowerCase().includes(lowerCaseTerm) ||
        user.middleName.toLowerCase().includes(lowerCaseTerm) ||
        user.lastName.toLowerCase().includes(lowerCaseTerm) ||
        user.email.toLowerCase().includes(lowerCaseTerm) ||
        user.address.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}
