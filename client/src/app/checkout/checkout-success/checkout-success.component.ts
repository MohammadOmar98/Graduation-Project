import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stat } from 'fs';
import { IOrder } from 'src/app/shared/models/order';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  order: IOrder;
  constructor(private router: Router) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation && navigation.extras && navigation.extras.state;
    if (state) {
      this.order = state as IOrder;
    }
  }

}
