import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AdminService } from '../admin.service'; // Using AdminService as in the user component
import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-register-consultancy',
  templateUrl: './register-consultancy.component.html',
  styleUrls: ['./register-consultancy.component.scss']
})
export class RegisterConsultancyComponent implements OnInit, OnDestroy {
  registerConsultancy: FormGroup;
  editMode = false;
  consultancy: any;
  errorMessage: string = '';
  hide3 = true;
  private subscriptions: Subscription[] = [];
  isThroughIcon:boolean;

  breadscrums = [
    {
      title: 'Register Consultancy',
      items: ['Admin'],
      active: 'Register Consultancy',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService // Using AdminService
  ) {
    this.initConsultancyForm();
  }

  ngOnInit() {
    this.adminService.isEditMode.subscribe(val=>{
      this.isThroughIcon = val;
      console.log(this.isThroughIcon)
    })
    const routeSub = this.route.queryParams.subscribe(params => {
      const consultancyId = params['id'];
      if (consultancyId) {
        this.fetchConsultancyById(consultancyId);
      }
    });
    this.subscriptions.push(routeSub);

  }

  initConsultancyForm() {
    this.registerConsultancy = this.fb.group({
      consultancyName: ['', Validators.required],
      phone1: ['', Validators.required],
      phone2: [''],
      email1: ['', [Validators.required, Validators.email]],
      email2: ['', [Validators.email]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      street: ['', Validators.required],
      pincode: ['', Validators.required],
      registrationNo: ['', Validators.required],
      website: ['', Validators.required],
      fbUrl: [''],
      linkedInUrl: [''],
      yearEstablished: ['', Validators.required],
      password: ['', Validators.required],
    });

    const formStatusSub = this.registerConsultancy.statusChanges.subscribe(status => {
      console.log('Form Status: ', status);
      console.log('Form Errors: ', this.registerConsultancy.errors);
      console.log('Form Controls: ', this.registerConsultancy.controls);
    });
    this.subscriptions.push(formStatusSub);
  }

  fetchConsultancyById(consultancyId: string) {
    const fetchConsultancySub = this.adminService.getConsultancyById(+consultancyId).subscribe(
      consultancy => {
        this.consultancy = consultancy;
        this.patchForm();
        this.editMode = true;
      },
      error => {
        console.error('Error fetching consultancy data:', error);
      }
    );
    this.subscriptions.push(fetchConsultancySub);
  }

  patchForm() {
    if (this.consultancy) {
      this.registerConsultancy.patchValue({
        consultancyName: this.consultancy.consultancyName || '',
        phone1: this.consultancy.phone1 || '',
        phone2: this.consultancy.phone2 || '',
        email1: this.consultancy.email1 || '',
        email2: this.consultancy.email2 || '',
        country: this.consultancy.country || '',
        state: this.consultancy.state || '',
        city: this.consultancy.city || '',
        address: this.consultancy.address || '',
        street: this.consultancy.street || '',
        pincode: this.consultancy.pincode || '',
        registrationNo: this.consultancy.registrationNo || '',
        website: this.consultancy.website || '',
        fbUrl: this.consultancy.fbUrl || '',
        linkedInUrl: this.consultancy.linkedInUrl || '',
        yearEstablished: this.consultancy.yearEstablished || '',
        password: this.consultancy.password || '',
      });
    }
  }

  onSubmit() {
    if (this.registerConsultancy.valid) {
      const submitSub = (this.isFormPrefilled() ?
        this.adminService.updateConsultancy(this.consultancy.id, this.registerConsultancy.value) :
        this.adminService.registerConsultancy(this.registerConsultancy.value)
      ).subscribe(
        response => {
          console.log('Success', response);
          this.router.navigate(['/admin/consultancy-list']);
        },
        error => {
          console.log('Error', error);
          this.showSnackBar(this.isFormPrefilled() ? 'Update failed. Please try again.' : 'Submission failed. Please try again.');
        }
      );
      this.subscriptions.push(submitSub);
    } else {
      this.errorMessage = 'Please fill all required fields.';
      console.log('Form is not valid');
    }
  }

  isFormPrefilled(): boolean {
    return !!this.consultancy && !!this.consultancy.id;
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
    });
  }


  // chosenYearHandler(normalizedYear: Date) {
  //   // Get the selected year from the normalized date
  //   const year = normalizedYear.getFullYear();
    
  //   // Update the form control with the selected year
  //   this.registerConsultancy.get('yearEstablished').setValue(year);
  // }
  
  

  ngOnDestroy() {
    this.adminService.isEditMode.next(true)
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
