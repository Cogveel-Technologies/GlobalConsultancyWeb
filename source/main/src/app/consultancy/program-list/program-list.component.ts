import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ProgramData } from '../consultancy-models/data.program';
import { ProgramService } from '../consultancy-services/program.service';


@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent {
  
  breadscrums = [
    {
      title: 'Program List',
      items: ['Programs'],
      active: 'Program List',
    },
  ];

  constructor(private router: Router, private route:ActivatedRoute
    , private programService:ProgramService) { }
  editMode:boolean;
  programs:ProgramData[];
  programForm: FormGroup;


  ngOnInit() { 
    // call get api here to show default list of program data
    this.programs = this.programService.data;
  }

  addProgram() {
    this.router.navigate(['consultancy/register-program'])
  }

  refreshPage() {
    console.log("Refresh button clicked");
    // Add your refresh logic here
  }

  deleteUser(userId: number) {
    console.log(`Delete user button clicked for user ${userId}`);
    // Add your delete logic here
  }

  // encryptData(data: any): string {
  //   const key = CryptoJS.enc.Utf8.parse('1234567890123456');  // Your secret key
  //   const iv = CryptoJS.enc.Utf8.parse('1234567890123456');  // Initialization vector
  //   const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv: iv });
  //   return encrypted.toString();
  // }

  editConsultancy(userId: number) {
    this.router.navigate(['consultancy/register-consultancy'],{queryParams:{editMode:true}})
    

  }

  // filterUsers(searchTerm: string) {
  //   if (!searchTerm) {
  //     this.programs = [...this.programs];
  //   } else {
  //     const lowerCaseTerm = searchTerm.toLowerCase();
  //     this.programs = this.programs.filter(user =>
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
