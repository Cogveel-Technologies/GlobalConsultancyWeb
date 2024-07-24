
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstituteService } from '../consultancy-services/institute.service';



@Component({
  selector: 'app-register-consultancy',
  templateUrl: './register-institute.component.html',
  styleUrls: ['./register-institute.component.scss']
})
export class RegisterInstituteComponent {
  breadscrums = [
    {
      title: 'Add Institute',
      items: ['Consultancy'],
      active: 'Add Institute',
    },
  ];
  registerInstitute: FormGroup;
  editMode: boolean;
  subscription: Subscription[] = [];
  details: any;
  id: number;
  editData: any;
  edit: any
  instituteId: string
  index: number



  constructor(private intituteService: InstituteService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.registerInstitute = new FormGroup({
      InstituteName: new FormControl(''),
      AboutInstitute: new FormControl(''),
      Province: new FormControl(''),
      Country: new FormControl(''),
      YearEstablished: new FormControl(''),
      Email: new FormControl(''),
      PhoneNo: new FormControl(''),
      Website: new FormControl(''),
      LinkedInUrl: new FormControl(''),
      FbUrl: new FormControl('')
    })

    const editInstitute = this.route.snapshot.data['editResponse'];
    if (editInstitute) {
      console.log(editInstitute)
      this.editMode = true;
      this.registerInstitute.patchValue(editInstitute)
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.forEach(sub => sub.unsubscribe());
    }
  }



  onSubmit() {
    const newDetails = this.registerInstitute.value;
    if (this.editMode) {
      this.intituteService.data[this.index] = newDetails
    } else {
      this.intituteService.data.push(newDetails)
    }
  }

}