import { Component, OnInit } from '@angular/core';
import { LoginUser } from '../models/loginUser';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';
import { TasinmazService } from '../services/tasinmaz.service';
import { AuthService } from '../services/auth.service';
import { LoginGuardService } from '../services/login-guard.service';

@Component({
  selector: 'app-kullanici',
  templateUrl: './kullanici.component.html',
  styleUrls: ['./kullanici.component.css']
})
export class KullaniciComponent implements OnInit {
  users: LoginUser[] = []; //çektiğimiz datayı Tasinmaz arrayinde toplayacağız. (models class oluşturuldu)
  showSuccessAlert: boolean = false; // Yeni özellik


  constructor(private http: HttpClient,
    private alertifyService: AlertifyService,
    private router: Router,
    private tasinmazService: TasinmazService,
    private authService: AuthService,
    private loginGuard:LoginGuardService) { }

  ngOnInit() {
    this.tasinmazService.getUser().subscribe((data) => {
      this.users = data;
    });
  }
 

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
        // Başka bir işlem yapabilirsiniz, örneğin yönlendirme veya bir bildirim gösterme
      },
      error => {
        console.error('Kullanıcı kaydı başarısız:', error);
        // Hata durumunda kullanıcıya bildirim gösterebilir veya başka bir işlem yapabilirsiniz
      }
    );
  }
  

}
