import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sehir } from '../models/sehir';
import { Observable } from 'rxjs';
import { Ilce } from '../models/ilce';
import { Mahalle } from '../models/mahalle';
import { Tasinmaz } from '../models/tasinmaz';
@Injectable({
  providedIn: 'root'
})

export class TasinmazService {
  path = "https://localhost:44364/api/"
  constructor(private http: HttpClient) { }

  

  getSehirler(): Observable<Sehir[]> {
    return this.http.get<Sehir[]>(`${this.path}il/getAll`);
  }
 
  getIlcelerBySehirId(sehirId: number): Observable<Ilce[]> {
    return this.http.get<Ilce[]>(`${this.path}ilce/getBySehirId/${sehirId}`);
  }

  getMahallelerByIlceId(ilceId : number): Observable<Mahalle[]> {
    return this.http.get<Mahalle[]>(`${this.path}mahalle/getBySehirId/${ilceId}`);
  }
  getTasinmazlar(): Observable<Tasinmaz[]> {
    return this.http.get<Tasinmaz[]>("https://localhost:44364/api/tasinmaz/getValues")
  }
  getTasinmaz(tasinmazId: number): Observable<Tasinmaz[]> {
    return this.http.get<Tasinmaz[]>(`${this.path}tasinmaz/getTasinmazById/${tasinmazId}`);
  }
  getTasinmazByUserId(userId: number): Observable<Tasinmaz[]> {
    return this.http.get<Tasinmaz[]>(`${this.path}tasinmaz/getByUserId?userId=${userId}`);
  }
 
  addTasinmaz(tasinmaz): Observable<Tasinmaz[]> {
    return this.http.post<Tasinmaz[]>(`${this.path}tasinmaz/add`, tasinmaz);
    //return this.http.post<Tasinmaz>("https://localhost:44364/api/tasinmaz/add/", newTasinmaz);
  }

  updateTasinmaz(tasinmazId: number, tasinmaz: Tasinmaz): Observable<Tasinmaz> {
    //return this.http.put<Tasinmaz>(`${this.path}tasinmaz/update/${tasinmazId}`, tasinmaz);
    return this.http.put<Tasinmaz>(`${this.path}tasinmaz/put?id=${tasinmazId}`, tasinmaz);
  }

  deleteTasinmaz(tasinmazId: number): Observable<void> {
    return this.http.delete<void>(`${this.path}tasinmaz/delete/${tasinmazId}`);
  }

 
}

