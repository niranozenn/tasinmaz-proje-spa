import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private formBuilder:FormBuilder, private alertify:AlertifyService,
     private router: Router, private httpClient:HttpClient) { }
    
    loginAddForm: FormGroup;
    users:User[]= []; //çektiğimiz datayı User arrayinde toplayacağız. (models class oluşturuldu)
    ngOnInit() {
      //this.getUsers().subscribe(data=>{this.users=data})
      this.createLoginAddForm();
      
    }
    getUsers(){
      return this.httpClient.get<User[]>("https://localhost:44364/api/values")//data yı map ettik
    }

    createLoginAddForm(){
      
      this.loginAddForm = this.formBuilder.group({
        userName: ['', Validators.required], // Form elemanları burada tanımlanacak
        password: ['', Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/)]
      });
    }
    
    get formControls(){return this.loginAddForm.controls;}
 
  /*add(){
    if(this.loginAddForm.valid){
      console.log(this.loginAddForm.value);
      //this.loginAddForm=Object.assign({}, this.loginAddForm.value);
    }
  }*/
  navigateToList(){
    this.router.navigate(['/tasinmaz-liste']); // Yönlendirme işlemi
  }
  

  
 

}
