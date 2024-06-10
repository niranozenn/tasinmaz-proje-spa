import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare let alertify: any;

@Injectable({ 
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
  error(message: string) {
    alertify.error(message);
  }

  success(message: string):void {
    alertify.success(message);
  }

  warning(message: string, onConfirm: () => void) :void{
  () => { 
    onConfirm();
  };
}
  
 

  confirm(message: string, onConfirm: () => void, onCancel: () => void): void {
    alertify.confirm(message,
      () => { 
        onConfirm();
      },
      () => { 
        onCancel();
      });
  }


  
}
