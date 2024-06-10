
import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';
import { Log } from '../models/Log';
import * as XLSX from 'xlsx';


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

  exportToExcel() {
    const header = [ 'Durum', 'İşlem Tipi', 'Açıklama', 'Tarih', 'Log IP', 'User Id'];
    const data = this.logs.map(log => [
      log.durum ? 'True' : 'False',
      log.islemTipi,
      log.aciklama,
      new Date(log.tarih).toLocaleString(), 
      log.logIp,
      log.userId
    ]);
    const stringData = data.map(row => row.map(String));
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([header].concat(stringData));
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');
  
    XLSX.writeFile(workbook, 'logs.xlsx');
  }
}  
