import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS

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
  users = [
    // Sample users data...
    { id: 1, firstName: 'Mark', middleName: 'Otto', lastName: 'Doe', password: 'Apass@123', gender: 'Male', email: 'mark@example.com', address: '123 Main St' },
    { id: 2, firstName: 'Jacob', middleName: 'Thornton', lastName: 'Smith', password: 'pass456', gender: 'Male', email: 'jacob@example.com', address: '456 Elm St' },
    { id: 3, firstName: 'Larry', middleName: 'Bird', lastName: 'Johnson', password: 'pass789', gender: 'Male', email: 'larry@example.com', address: '789 Oak St' },
    { id: 4, firstName: 'John', middleName: 'Cena', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'john@example.com', address: '124 Main St' },
    { id: 5, firstName: 'Jane', middleName: 'Doe', lastName: 'Doe', password: 'pass123', gender: 'Female', email: 'jane@example.com', address: '125 Main St' },
    { id: 6, firstName: 'Alice', middleName: 'Wonderland', lastName: 'Doe', password: 'pass123', gender: 'Female', email: 'alice@example.com', address: '126 Main St' },
    { id: 7, firstName: 'Bob', middleName: 'Builder', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'bob@example.com', address: '127 Main St' },
    { id: 8, firstName: 'Charlie', middleName: 'Chocolate', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'charlie@example.com', address: '128 Main St' },
    { id: 9, firstName: 'David', middleName: 'Bowie', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'david@example.com', address: '129 Main St' },
    { id: 10, firstName: 'Eve', middleName: 'Apple', lastName: 'Doe', password: 'pass123', gender: 'Female', email: 'eve@example.com', address: '130 Main St' },
    { id: 11, firstName: 'Frank', middleName: 'Sinatra', lastName: 'Doe', password: 'pass123', gender: 'Male', email: 'frank@example.com', address: '131 Main St' }
  ];

  filteredUsers = [...this.users]; // Initialize with all users

  constructor(
   private router:Router
  ) { }

  ngOnInit() {}

  addUser() {
    console.log("Add user button clicked");
  }

  refreshPage() {
    console.log("Refresh button clicked");
    // Add your refresh logic here
  }

  deleteUser(userId: number) {
    console.log(`Delete user button clicked for user ${userId}`);
    // Add your delete logic here
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
  // editUser(userId: number) {
  //   const edit = this.users.find(el => el.id === userId);
  //   if (edit) {
  //     this.router.navigate(['/admin/adminusers'], {
  //       queryParams: {
  //         id: edit.id,
  //         firstName: edit.firstName,
  //         middleName: edit.middleName,
  //         lastName: edit.lastName,
  //         email: edit.email,
  //         address: edit.address,
  //         gender: edit.gender,
  //         password: edit.password
  //       }
  //     });
  //   }
  // }
  

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
