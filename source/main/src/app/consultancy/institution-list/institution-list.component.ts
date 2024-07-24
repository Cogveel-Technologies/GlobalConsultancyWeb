import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS
import { InstituteData } from '../consultancy-models/data.institute';
import { InstituteService } from '../consultancy-services/institute.service';


@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss'],
})

export class InstitutionListComponent {

  breadscrums = [
    {
      title: 'Institution List',
      items: ['Consultancy'],
      active: 'Institution List',
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute, private instituteService: InstituteService) { }
  editMode: boolean
  instituteForm: FormGroup;
  institutes: any;



  ngOnInit() {
    this.institutes = this.instituteService.data;
    this.institutes = this.instituteService.getInstituteData();
  }

  addInstitute() {
    this.router.navigate(['consultancy/register-consultancy'])
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

  editConsultancy(userId: number) {
    this.router.navigate(['consultancy/register-consultancy'], { queryParams: { editMode: true } })


  }

  // filterUsers(searchTerm: string) {
  //   if (!searchTerm) {
  //     this.institutes = [...this.institutes];
  //   } else {
  //     const lowerCaseTerm = searchTerm.toLowerCase();
  //     this.institutes = this.institutes.filter(user =>
  //       user.ConsultancyName.toLowerCase().includes(lowerCaseTerm) ||
  //       user.Email1.toLowerCase().includes(lowerCaseTerm) ||
  //       user.Email2.toLowerCase().includes(lowerCaseTerm) ||
  //       user.Country.toLowerCase().includes(lowerCaseTerm) ||
  //       user.State.toLowerCase().includes(lowerCaseTerm) ||
  //       user.City.toLowerCase().includes(lowerCaseTerm) ||
  //       user.Address.toLowerCase().includes(lowerCaseTerm)
  //     );
  //   }
  // }
}