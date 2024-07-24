import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';  // Import CryptoJS
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyData } from '../consultancy-models/data.consultancy';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-consultancy-list',
  templateUrl: './consultancy-list.component.html',
  styleUrls: ['./consultancy-list.component.scss']
})
export class ConsultancyListComponent implements OnInit {

  breadscrums = [
    {
      title: 'Consultancy List',
      items: ['Consultancy'],
      active: 'Consultancy List',
    },
  ];

  constructor(private router: Router, private route:ActivatedRoute, private consultancyService:ConsultancyService) { }
  editMode:boolean
  consultancies!:Observable<ConsultancyData[]>;

  ngOnInit() { 
    // RETREIVE CONSULTANCY DATA
     this.consultancies = this.consultancyService.getConsultancyData()
    
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

  viewDetails(){
   
  }

  encryptData(data: any): string {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456');  // Your secret key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // Initialization vector
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
    return encrypted.toString();
  }

  editConsultancy(userId: number) {
    this.router.navigate(['consultancy/register-consultancy'],{queryParams:{editMode:true}})
  }
    
}
