import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
busyRequestCount = 0;

constructor(private spinnerService: NgxSpinnerService) { }

// tslint:disable-next-line:typedef
busy() {
  this.busyRequestCount++;
  this.spinnerService.show(undefined, {
    type: 'timer',
    bdColor: 'rgba(255,255,255,0.3)',
    color: '#333333',
    size: 'medium',


  });
}

// tslint:disable-next-line:typedef
idle(){
  this.busyRequestCount--;
  if (this.busyRequestCount <= 0){
    this.busyRequestCount = 0;
    this.spinnerService.hide();
  }
}

}
