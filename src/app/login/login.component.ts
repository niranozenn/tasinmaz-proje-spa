import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/loginUser';
import { ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private formBuilder:FormBuilder, private authService:AuthService) { }
    
    loginForm: FormGroup;
    loginUser:any={}

    ngOnInit() {     
      this.loginForm = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }); 
    }
    login(){
      this.authService.login(this.loginUser);
    }
    /*logOut(){
      this.authService.logOut();
    }*/
  
 

}
