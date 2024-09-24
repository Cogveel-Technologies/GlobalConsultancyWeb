import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
 
} from '@angular/forms';
import { loginService } from 'app/login.service';
import { catchError, map, tap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent{
  constructor(private loginService:loginService, private router:Router, private toastr:ToastrService) { }
    signInForm: FormGroup;
    ngOnInit(): void {
        this.signInForm = new FormGroup({
            userName: new FormControl(''),
            password: new FormControl(''),
        })

        localStorage.clear()
    }
    signIn() {
      const credentials = this.signInForm.value;
      this.loginService.logIn(credentials).pipe(
        map(res => {
          return res['data'];
        })).subscribe({
        next: res => {
          console.log(res)
          localStorage.setItem("token", res.jwtToken);
          localStorage.setItem("modulesAccess", res.moduleAccessName);
          localStorage.setItem("id",res.id);
          localStorage.setItem("menu",JSON.stringify(res.menuItems));
          localStorage.setItem("role",res.roleName)
          console.log(res.roleName);
          this.router.navigate(['dashboard']);
        }
      });
    }
  }

