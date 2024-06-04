
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from "@angular/router";
import { AlertifyService } from "./alertify.service";
import { LoginUser } from "../models/loginUser";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  private baseUrl = 'https://localhost:44364/api/Auth/register';
  path = "https://localhost:44364/api/Auth/";
  userToken: any;
  decodeToken: any;
  userId: any;
  jwtHelper: JwtHelperService = new JwtHelperService();
  TOKEN_KEY = "token";
  ROLE_KEY = "role";
  loggedIn = false;
  IsuserLogged=false;

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
        this.userId = this.decodeToken.nameid;
        const userRole = this.decodeToken.role;
        localStorage.setItem(this.ROLE_KEY, userRole);
        this.alertify.success(`Hoşgeldiniz, ${this.decodeToken.unique_name}!`);
        console.log("Sisteme Giriş yapıldı!");
        this.loggedIn = true;
        this.router.navigateByUrl("/tasinmaz-liste");
      }, error => {
        console.log("Giriş başarısız.");
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
   /* return localStorage.getItem(this.TOKEN_KEY)!==null
    ? (this.IsuserLogged=true)
    : false ;*/
  
    return !!token && !this.jwtHelper.isTokenExpired(token);
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

  registerUser(user: LoginUser): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, user);
  }

  

  
}
