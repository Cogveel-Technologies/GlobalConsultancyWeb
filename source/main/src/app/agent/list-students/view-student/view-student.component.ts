import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
// import { Student } from '../models/student.model';
import { Student } from 'app/agent/models/student.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  student: Student | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encryptedData = params['data'];
      if (encryptedData) {
        this.student = this.decryptData(encryptedData);
      }
    });
  }

  decryptData(encryptedData: string): Student {
    const key = CryptoJS.enc.Utf8.parse('1234567890123456'); // Your secret key
    const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // Initialization vector
    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv });
    const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
}
