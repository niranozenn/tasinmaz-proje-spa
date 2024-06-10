import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { TasinmazService } from '../services/tasinmaz.service';
import { AuthService } from '../services/auth.service';
import { LoginGuardService } from '../services/login-guard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-kullanici',
  templateUrl: './kullanici.component.html',
  styleUrls: ['./kullanici.component.css']
})
export class KullaniciComponent implements OnInit {
  users: LoginUser[] = []; 
  showSuccessAlert: boolean = false; 
  kullaniciForm: FormGroup;
  username: HTMLInputElement;
  password: HTMLInputElement;
  role: HTMLInputElement;
  


  constructor(private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private tasinmazService: TasinmazService,
    private authService: AuthService,
    private loginGuard:LoginGuardService) { }

  ngOnInit() {
    this.kullaniciForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), ] ),
      role: new FormControl([''])
    }); 
    this.tasinmazService.getUser().subscribe((data) => {
      this.users = data;
    });
  }
 
/*
  registerUser(username: string, password: string, role: string): void {
    const alertDisplayTime=3000;

    const user = { userName: username, password: password, role: role };
    
    this.authService.registerUser(user).subscribe(
      () => {
        console.log('Kullanıcı başarıyla kaydedildi.');
        this.alertifyService.successNotification
        this.showSuccessAlert = true; 
        setTimeout(()=>{
          this.showSuccessAlert=false;
          this.router.navigate(["../kullanici/"]);

        },alertDisplayTime)
      },
      error => {
        console.error('Kullanıcı kaydı başarısız:', error);
      }
    );
  }*/

    registerUser(): void {
      const alertDisplayTime = 3000;
    
      const formData = this.kullaniciForm.value;
      const user = { userName: formData.username, password: formData.password, role: formData.role };
    
      this.authService.registerUser(user).subscribe(
        () => {
          console.log('Kullanıcı başarıyla kaydedildi.');
          this.alertifyService.successNotification
          this.showSuccessAlert = true; 
          setTimeout(()=>{
            this.showSuccessAlert=false;
            this.router.navigate(["../kullanici/"]);
            this.refreshPage();
    
          },alertDisplayTime)
        },
        error => {
          console.error('Kullanıcı kaydı başarısız:', error);
        }
      );
    }
    refreshPage(): void {
      window.location.reload();
    }
  

}
