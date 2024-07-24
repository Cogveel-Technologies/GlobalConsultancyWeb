import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
 
} from '@angular/forms';
import { loginService } from 'app/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent{
  constructor(private loginService:loginService, private router:Router) { }
    signInForm: FormGroup;
    ngOnInit(): void {
        this.signInForm = new FormGroup({
            email: new FormControl(''),
            password: new FormControl(''),
        })
    }
    signIn(){
      this.loginService.logIn().subscribe(res=>{
        this.loginService.setLoggedinUser(res);
        this.router.navigate(['dashboard'])
      })
    }
}
