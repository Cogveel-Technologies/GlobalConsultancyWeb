import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';
import { Observable } from 'rxjs';
import { ConsultancyService } from '../consultancy-services/consultancy.service';
import { ConsultancyDetailsOptions } from '../consultancy-models/data.consultancy-get-options';





@Component({
  selector: 'app-register-consultancy',
  templateUrl: './register-institute.component.html',
  styleUrls: ['./register-institute.component.scss'],

})
export class RegisterInstituteComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private consultancyApiService: ConsultancyApi,
    private consultancyService: ConsultancyService,
  ) { }

  subscriptions: Subscription = new Subscription();
  breadscrums = [
    {
      title: 'Add Institute',
      items: ['Institutes'],
      active: 'Add Institute',
    },
  ];
  registerInstitute: FormGroup;
  editMode: boolean = false;
  details: any;
  id: number;
  editId: number;
  instituteId: string;
  consultancyId: number;
  countries: Observable<{ countryName: string, id: number|string }[]>;
  defaultData: ConsultancyDetailsOptions = { ...this.consultancyService.defaultRenderData() };
  countryId: number;
  countryName: string;

  ngOnInit() {
     
    this.registerInstitute = new FormGroup({
      instituteName: new FormControl(''),
      aboutInstitute: new FormControl(''),
      province: new FormControl(''),
      countryId: new FormControl(''),
      consultancyId: new FormControl(''),
      yearEstablished: new FormControl(''),
      email: new FormControl(''),
      phoneNo: new FormControl(''),
      website: new FormControl(''),
      linkedInUrl: new FormControl(''),
      fbUrl: new FormControl('')
    });
    // get countries for dropdown
    this.countries = this.consultancyApiService.getAllCountries()
    // for editMode
    const editInstitute = this.route.snapshot.data['editResponse'];
    if (editInstitute) {
      console.log(editInstitute)
      this.editId = +this.route.snapshot.paramMap.get('id');
      this.editMode = true;
      this.registerInstitute.patchValue(editInstitute);
    }
  }

  // on country selection
  onCountryChange(event: any) {
    this.countryId = event.value;
    localStorage.setItem("countryId", event.value)
  }

  // Filter function to allow all dates (past, today, and future)
  date = (date: Date | null): boolean => {
    return true; // Allow all dates without restriction
  };

  // navigate to institute list page
  navigateToInstituteList() {
    if (this.editMode) {
      this.consultancyService.instituteEditState.next(true)
      this.consultancyService.showList.next(true)
      this.router.navigate(['consultancy', 'institution-list']);
    } else {
      this.router.navigate(['consultancy', 'institution-list']);
    }
  }

  onSubmit() {
    const newDetails = this.registerInstitute.value;
    newDetails.consultancyId = localStorage.getItem('id')
    

    if (this.editMode) {
      this.subscriptions.add(
        this.consultancyApiService.updateInstitute(this.editId, newDetails).subscribe(res => {
          if (res['status'] >= 200 && res['status'] < 300) {
            this.navigateToInstituteList();
          }
        })
      );
    } else {
      // add consultancy id and country id to data supposed to send to the backend
      // newDetails.consultancyId = +localStorage.getItem("id");
      newDetails.countryId = this.countryId
      this.subscriptions.add(
        this.consultancyApiService.registerInstitute(newDetails).subscribe(res => {
          if (res['status'] >= 200 && res['status'] < 300) {
            this.navigateToInstituteList()
          }
        })
      );
    }

  }



  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
