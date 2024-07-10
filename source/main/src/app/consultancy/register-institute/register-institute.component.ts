
import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InstituteService } from '../institute.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstituteData } from '../consultancy-models/data.institute';


@Component({
  selector: 'app-register-consultancy',
  templateUrl: './register-institute.component.html',
  styleUrls: ['./register-institute.component.scss']
})
export class RegisterInstituteComponent {
  breadscrums = [
    {
      title: 'Add Institute',
      items: ['Register Institute'],
      active: 'Add Institute',
    },
  ];
  registerConsultancy: FormGroup;
  editMode: boolean;
  subscription: Subscription[] = [];
  details: any;
  id: number;
  editData: any;
  edit: any
  instituteId: string
  index:number



  constructor(private intituteService: InstituteService, private router: Router, private route: ActivatedRoute,) {

  }
  ngOnInit() {
    this.registerConsultancy = new FormGroup({
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

    this.route.url.subscribe(urlSegments => {
      const currentUrl = this.router.url;
      if (currentUrl.includes('/institute-list/edit-institute')) {
        this.editMode = true

        // Get the ID parameter from the route
        this.route.params.subscribe(params => {
          this.instituteId = params['id'];
          const InstituteDetails = this.intituteService.ELEMENT_DATA.find(el => el.InstituteName === this.instituteId);
          this.registerConsultancy.patchValue(InstituteDetails)
          // call api and provide id
        })
      } else {
        this.editMode = false
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.forEach(sub => sub.unsubscribe());
    }
  }



  onSubmit() {
    const newDetails = this.registerConsultancy.value;
    if(this.editMode){
      this.intituteService.ELEMENT_DATA[this.index] = newDetails
    }else{
      this.intituteService.ELEMENT_DATA.push(newDetails)
    }
  }

}