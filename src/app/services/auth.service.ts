
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
  private baseUrl = 'https://localhost:44364/api/Auth/register';
  private path = "https://localhost:44364/api/Auth/";
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private TOKEN_KEY = "token";
  private ROLE_KEY = "role";

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json");
    this.httpClient
      .post(this.path + "login", loginUser, { headers: headers, responseType: 'text' })
      .subscribe((data) => {
       
        if (data) {
          this.saveToken(data);
         
          const decodedToken = this.jwtHelper.decodeToken(data);
          localStorage.setItem('userId', decodedToken.nameid);
          localStorage.setItem(this.TOKEN_KEY, data);
          //localStorage.setItem(this.ROLE_KEY, decodedToken.role);
          this.alertify.success(`Hoşgeldiniz, ${decodedToken.unique_name}!`);
          this.router.navigateByUrl("/tasinmaz-liste");
        } else {
          console.log("Giriş başarısız. Sunucudan null yanıt alındı.");
        }
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
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('userId');
    localStorage.removeItem(this.ROLE_KEY);
    this.router.navigateByUrl("/login");
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
