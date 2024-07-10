import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS

@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.scss']
})
export class ConsultancyListComponent implements OnInit {

  breadscrums = [
    {
      title: 'Consultancy List',
      items: ['Consultancies'],
      active: 'Consultancy List',
    },
  ];
  users = [
    // Sample users data with unique id field...
    {
      id: 1,
      ConsultancyName: "Tech Innovators Consultancy",
      Phone1: 1234567890,
      Phone2: 9876543210,
      Email1: "info@techinnovators.com",
      Email2: "support@techinnovators.com",
      Country: "USA",
      State: "California",
      City: "San Francisco",
      Address: "123 Market Street",
      Street: "Market Street",
      Pincode: "94103",
      RegistrationNo: "TIC-2024-001",
      Website: "https://techinnovators.com",
      FbUrl: "https://facebook.com/techinnovators",
      LinkedInUrl: "https://linkedin.com/company/techinnovators",
      YearEstablished: 2010,
      Password: "securepassword123"
    },
    {
      id: 2,
      ConsultancyName: "Future Insights Consultancy",
      Phone1: 2234567890,
      Phone2: 2876543210,
      Email1: "info@futureinsights.com",
      Email2: "support@futureinsights.com",
      Country: "USA",
      State: "California",
      City: "Los Angeles",
      Address: "456 Sunset Boulevard",
      Street: "Sunset Boulevard",
      Pincode: "90028",
      RegistrationNo: "FIC-2024-002",
      Website: "https://futureinsights.com",
      FbUrl: "https://facebook.com/futureinsights",
      LinkedInUrl: "https://linkedin.com/company/futureinsights",
      YearEstablished: 2012,
      Password: "anothersecurepassword"
    },
  ];

  filteredUsers = [...this.users]; // Initialize with all users

  constructor(private router: Router) { }

  ngOnInit() { }

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
    console.log(edit);
    if (edit) {
      const encryptedData = this.encryptData(edit);
      this.router.navigate(['/admin/register-consultancy'], {
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
        user.ConsultancyName.toLowerCase().includes(lowerCaseTerm) ||
        user.Email1.toLowerCase().includes(lowerCaseTerm) ||
        user.Email2.toLowerCase().includes(lowerCaseTerm) ||
        user.Country.toLowerCase().includes(lowerCaseTerm) ||
        user.State.toLowerCase().includes(lowerCaseTerm) ||
        user.City.toLowerCase().includes(lowerCaseTerm) ||
        user.Address.toLowerCase().includes(lowerCaseTerm)
      );
    }
  }
}
