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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasinmazListeComponent,
    NavComponent,
    TasinmazAddComponent,
    TasinmazUpdateComponent,
    MapComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
   
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { 
   
    
}
