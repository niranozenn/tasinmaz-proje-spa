import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasinmazListeComponent } from './tasinmaz-liste/tasinmaz-liste.component';
import { LoginComponent } from './login/login.component';
import { TasinmazAddComponent } from './tasinmaz-add/tasinmaz-add.component';
import { TasinmazUpdateComponent } from './tasinmaz-update/tasinmaz-update.component';
import { MapComponent } from '../app/map/map.component';
import { LoginGuardService } from './services/login-guard.service';
import { AdminGuardService } from './services/admin-guard.service';
import { KullaniciComponent } from './kullanici/kullanici.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasinmaz-liste', component: TasinmazListeComponent, canActivate: [LoginGuardService] },
  { path: 'tasinmaz-add', component: TasinmazAddComponent, canActivate: [LoginGuardService] },
  { path: 'tasinmaz-update', component: TasinmazUpdateComponent, canActivate: [LoginGuardService] },
  { path: 'tasinmaz-update/:id', component: TasinmazUpdateComponent, canActivate: [LoginGuardService] },
  { path: 'map', component: MapComponent, canActivate: [LoginGuardService] },
  { path: 'kullanici', component: KullaniciComponent, canActivate: [LoginGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
