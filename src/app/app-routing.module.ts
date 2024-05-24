import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TasinmazListeComponent } from './tasinmaz-liste/tasinmaz-liste.component';
import { LoginComponent } from './login/login.component';
import { TasinmazAddComponent } from './tasinmaz-add/tasinmaz-add.component';
import { TasinmazUpdateComponent } from './tasinmaz-update/tasinmaz-update.component';
import { MapComponent } from '../app/map/map.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasinmaz-liste', component: TasinmazListeComponent},
  { path: 'tasinmaz-add', component: TasinmazAddComponent },
  { path: 'tasinmaz-update', component: TasinmazUpdateComponent},
  { path: 'tasinmaz-update/:id', component: TasinmazUpdateComponent },
  { path: 'map', component: MapComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

