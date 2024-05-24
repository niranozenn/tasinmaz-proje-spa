import { Injectable } from '@angular/core';
declare let alertify:any;

@Injectable({ //global olarak default ekleyen servis
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
 
  message(message: string) {
    alertify.message(message);
  }

  successNotification(message: string): void {
    alertify.notify(message, 'success', 5);
  }
  dangerNotification(message: string): void {
    alertify.notify(message, 'danger', 5);
  }
  warningNotification(message: string): void {
    alertify.notify(message, 'warning', 5);
  }


  
}
