
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { LoginUser } from "../models/loginUser";
declare let userId: any;
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  path = "https://localhost:44364/api/Auth/";
  userToken: any;
  decodeToken: any;
  userId : any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "login", loginUser, { headers: headers, responseType: 'text' })
      .subscribe((data) => {
        this.saveToken(data);
        this.userToken = data;
        this.decodeToken = this.jwtHelper.decodeToken(data);
        const userId = this.decodeToken.nameid;
        localStorage.setItem('userId', userId);
        this.userId = this.decodeToken.nameid; // userId'yi token'dan al
        this.alertify.success(`Hoşgeldiniz, ${this.decodeToken.unique_name}!`); // Hoş geldin mesajı
        console.log("Sisteme Giriş yapıldı!"); // Başarılı giriş mesajı
        console.log("User ID: ", this.userId); // User ID'yi konsola yazdır

        this.router.navigateByUrl("/tasinmaz-liste");
      }, error => {
        console.log("Giriş başarısız."); // Başarısız giriş mesajı
      });
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getUserId(): number {
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }
  /*
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }*/



  
}
