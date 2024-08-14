import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription, tap } from 'rxjs';
import { ConsultancyApi } from '../consultancy-services/api.service';

@Component({
  selector: 'app-register-consultancy',
  templateUrl: './register-institute.component.html',
  styleUrls: ['./register-institute.component.scss']
})
export class RegisterInstituteComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  breadscrums = [
    {
      title: 'Add Institute',
      items: ['Consultancy'],
      active: 'Add Institute',
    },
  ];
  registerInstitute: FormGroup;
  editMode: boolean = false;
  details: any;
  id: number;
  editId:number;
  instituteId: string;
  consultancyId:number

  // static data for consultancies
  Consultancies: number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private consultancyApiService: ConsultancyApi,
  ) {
    this.registerInstitute = new FormGroup({
      instituteName: new FormControl(''),
      aboutInstitute: new FormControl(''),
      province: new FormControl(''),
      country: new FormControl(''),
      consultancyId: new FormControl(''),
      yearEstablished: new FormControl(''),
      email: new FormControl(''),
      phoneNo: new FormControl(''),
      website: new FormControl(''),
      linkedInUrl: new FormControl(''),
      fbUrl: new FormControl('')
    });
  }

  ngOnInit() {
    // for editMode
    const editInstitute = this.route.snapshot.data['editResponse'];
    console.log(editInstitute)

     this.editId = +this.route.snapshot.paramMap.get('id');
     if (editInstitute) {
       this.editMode = true;
       this.registerInstitute.patchValue(editInstitute);
     }
  }

  // display error or register message and navigate

  displayMessageAndNavigate(message:string, path:string[]){
    alert(message)
    this.router.navigate(path)
  }

  onSubmit() {
    const newDetails = this.registerInstitute.value;
    console.log(newDetails)
    if (this.editMode) {
      this.subscriptions.add(
        this.consultancyApiService.updateInstitute(this.editId, newDetails).subscribe(res => {
          this.displayMessageAndNavigate("Updated Successfully", ["consultancy","institution-list"])
        })
          
      );
    } else {
      this.subscriptions.add(
        this.consultancyApiService.registerInstitute(newDetails).pipe(tap(res=> console.log(res))).subscribe(res => {
          this.displayMessageAndNavigate("Registered Successfully", ["consultancy","institution-list"])
          this.router.navigate(['consultancy','institution-list']);
        })
      );
    }
    
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
