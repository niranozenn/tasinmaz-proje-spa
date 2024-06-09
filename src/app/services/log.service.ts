// src/app/services/log.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private path = 'https://localhost:44364/api/Log/getLogs';

  constructor(private http: HttpClient) {}

  getLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(this.path);
  }
}
