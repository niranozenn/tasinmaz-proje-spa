/*
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { LoginUser } from "../models/loginUser";

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
  userId: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";
  loggedIn = false;
  private userRole: string = 'user'; // Default role

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
        this.userRole = this.decodeToken.role; // Assuming the role is stored in 'role' claim
        this.alertify.success(`Hoşgeldiniz, ${this.decodeToken.unique_name}!`); // Hoş geldin mesajı
        console.log("Sisteme Giriş yapıldı!"); // Başarılı giriş mesajı
        this.loggedIn = true;
        this.router.navigateByUrl("/tasinmaz-liste");
      }, error => {
        console.log("Giriş başarısız."); // Başarısız giriş mesajı
      });
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(): number {
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('userId');
    this.router.navigateByUrl("/login");
    this.loggedIn = false;
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
*/

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { LoginUser } from "../models/loginUser";

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
  userId: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";
  ROLE_KEY = "role";
  loggedIn = false;

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
        const userRole = this.decodeToken.role; // Rol bilgisini token'dan al
        localStorage.setItem(this.ROLE_KEY, userRole); // Rol bilgisini localStorage'a kaydet
        this.alertify.success(`Hoşgeldiniz, ${this.decodeToken.unique_name}!`); // Hoş geldin mesajı
        console.log("Sisteme Giriş yapıldı!"); // Başarılı giriş mesajı
        this.loggedIn = true;
        this.router.navigateByUrl("/tasinmaz-liste");
      }, error => {
        console.log("Giriş başarısız."); // Başarısız giriş mesajı
      });
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserId(): number {
    return parseInt(localStorage.getItem('userId') || '0', 10);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('userId');
    localStorage.removeItem(this.ROLE_KEY);
    this.router.navigateByUrl("/login");
    this.loggedIn = false;
  }

  getRole(): string | null {
    return localStorage.getItem(this.ROLE_KEY);
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }
}


