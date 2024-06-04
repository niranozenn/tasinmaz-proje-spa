/*
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  flag= false;

  constructor(private authService: AuthService, private router: Router,
    private aletify: AlertifyService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      this.flag=true;
      return true;
    } else {
      this.flag=false;
      this.aletify.error("Giriş yapmak için yetiniz yok")
      this.router.navigate(["/tasinmaz-liste"]);
      return false;
    }
  }
}

*/

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertifyService } from './alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  flag = false;
  jwtHelper: JwtHelperService = new JwtHelperService();


  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  /*canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      this.flag = true;
      return true;
    } else {
      this.flag = false;
      this.alertify.error("Giriş yapmak için yetkiniz yok");
      this.router.navigate(["/tasinmaz-liste"]);
      return false;
    }
  }*/

  canActivate(): boolean {
    const token = this.authService.getToken(); // AuthService'ten tokeni al
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userRole = decodedToken.userRole;
      console.log("jjjjj")
      console.log(userRole)

      if (userRole === 'admin') { // Kullanıcının rolü 'Yönetici' mi kontrol et
        return true; // Erişime izin ver
        console.log("11111")
      } else {
        this.alertify.error('Bu Sayfayı Görüntüleme Yetkiniz Yok')
        this.router.navigate(['/tasinmaz-liste']); // Kullanıcı yönetici değilse başka bir sayfaya yönlendir
        return false; // Erişime izin verme
      }
    }
  }
}
