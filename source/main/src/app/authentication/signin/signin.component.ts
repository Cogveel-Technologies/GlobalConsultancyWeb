

  import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import {
  FormControl,
  FormGroup,
 
} from '@angular/forms';
import { loginService } from 'app/login.service';
import {  map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'app/general-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  loginForm!: UntypedFormGroup;
  submitted = false;
  error = '';
  hide = true;
  roleName:string
  constructor(
    private formBuilder: UntypedFormBuilder,
    // private router: Router,
    private authService: AuthService,
    private loginService:loginService,
    private router:Router, 
    private toastr:ToastrService,
  ) {
    super();
  }
  signInForm: FormGroup;
    ngOnInit(): void {
        this.signInForm = new FormGroup({
            userName: new FormControl(''),
            password: new FormControl(''),
        })

        localStorage.clear()
    }
 
  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  signIn() {
    const credentials = this.signInForm.value;
    this.loginService.logIn(credentials).pipe(
      map(res => {
        return res['data'];
      })).subscribe({
      next: res => {
        localStorage.setItem('permissions',JSON.stringify(res.permissions))
        localStorage.setItem("token", res.jwtToken);
        localStorage.setItem("id",res.id);
        localStorage.setItem("menu",JSON.stringify(res.menuItems));
        localStorage.setItem("roleName", res.roleName);
        this.roleName = localStorage.getItem("roleName")
        if(this.roleName === 'Student'){
          this.router.navigate(['./student/student-profile']);
        }else if(this.roleName === 'Agent'){
          this.router.navigate(['./agent/list-students']);
        }else if(this.roleName === 'Admin'){
          this.router.navigate(['./admin/consultancy-list']);
        }
        else{
          this.router.navigate(['dashboard']);
        }
      }
    });
  }
}
 

