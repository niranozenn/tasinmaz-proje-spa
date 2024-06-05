
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AlertifyService } from './alertify.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userRole = decodedToken.role;

      if (userRole === 'admin') {
        return true;
      } else {
        this.alertify.error('Bu Sayfayı Görüntüleme Yetkiniz Yok');
        this.router.navigate(['/tasinmaz-liste']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

