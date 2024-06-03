/*import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor() { }
}*/

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

