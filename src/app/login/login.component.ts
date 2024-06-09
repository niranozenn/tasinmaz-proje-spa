
    import { Component, OnInit } from '@angular/core';
    import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
    import { AuthService } from '../services/auth.service';

    
    @Component({
      selector: 'app-login',
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css']
    })
    export class LoginComponent implements OnInit {
    
      loginForm: FormGroup;
      loginUser: any = {};
    
      constructor(private formBuilder: FormBuilder, private authService: AuthService) { }
    
      ngOnInit() {     
        this.loginForm = new FormGroup({
          userName: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [Validators.required, Validators.minLength(8)])
        }); 
      }
    
      login() {
        if (this.loginForm.valid) {
          this.loginUser = Object.assign({}, this.loginForm.value);
          this.authService.login(this.loginUser);
        }
      }
    }
    
