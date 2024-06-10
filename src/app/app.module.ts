import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { TasinmazListeComponent } from './tasinmaz-liste/tasinmaz-liste.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { TasinmazAddComponent } from './tasinmaz-add/tasinmaz-add.component';
import { TasinmazUpdateComponent } from './tasinmaz-update/tasinmaz-update.component';
import { MapComponent } from './map/map.component';
import { AuthService } from './services/auth.service';
import { LoginGuardService } from './services/login-guard.service';
import { KullaniciComponent } from './kullanici/kullanici.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LogComponent } from './log/log.component';
import { LogService } from './services/log.service';
import { NgxSelectModule } from 'ngx-select-ex';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasinmazListeComponent,
    NavComponent,
    TasinmazAddComponent,
    TasinmazUpdateComponent,
    MapComponent,
    KullaniciComponent,
    LogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSelectModule

   
  ],
  providers: 
   [AlertifyService, AuthService, LoginGuardService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },LogService],
  bootstrap: [AppComponent]
})
export class AppModule { 
   
    
}
