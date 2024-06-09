// src/app/log/log.component.ts
import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';
import { Log } from '../models/Log';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logs: Log[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.getLogs();
  }

  getLogs() {
    this.logService.getLogs().subscribe(
      (data: Log[]) => {
        this.logs = data;
      },
      (error) => {
        console.error('Logları alırken bir hata oluştu:', error);
      }
    );
  }
}
