// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import {
//   FormControl,
//   FormGroup,
 
// } from '@angular/forms';
// import { loginService } from 'app/login.service';
// import {  map } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.scss'],
// })
// export class SigninComponent{
//   constructor(private loginService:loginService, private router:Router, private toastr:ToastrService) { }
//     signInForm: FormGroup;
//     ngOnInit(): void {
//         this.signInForm = new FormGroup({
//             userName: new FormControl(''),
//             password: new FormControl(''),
//         })

//         localStorage.clear()
//     }
//     signIn() {
//       const credentials = this.signInForm.value;
//       this.loginService.logIn(credentials).pipe(
//         map(res => {
//           return res['data'];
//         })).subscribe({
//         next: res => {
//           console.log(res.menu)
//           localStorage.setItem("token", res.jwtToken);
//           localStorage.setItem("id",res.id);
//           localStorage.setItem("menu",JSON.stringify(res.menuItems));
//           localStorage.setItem("roleName", res.roleName);
//           this.router.navigate(['dashboard']);
//         }
//       });
//     }
//   }


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
  constructor(
    private formBuilder: UntypedFormBuilder,
    // private router: Router,
    private authService: AuthService,
    private loginService:loginService, private router:Router, private toastr:ToastrService
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
        console.log(res.menu)
        console.log(res.roleName)
        localStorage.setItem("token", res.jwtToken);
        localStorage.setItem("id",res.id);
        localStorage.setItem("menu",JSON.stringify(res.menuItems));
        localStorage.setItem("roleName", res.roleName);
        this.router.navigate(['dashboard']);
      }
    });
  }
}
 

