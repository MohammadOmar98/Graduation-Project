import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasketService } from 'src/app/basket/basket.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { CheckoutService } from '../checkout.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
 @Input() checkoutForm: FormGroup;
 deliveryMethods: IDeliveryMethod[];
  constructor(private checkoutService: CheckoutService, private basketService: BasketService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.checkoutService.getDeliveryMethods().subscribe((dm: IDeliveryMethod[]) => {
     this.deliveryMethods = dm;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  setShippingPrice(deliveryMethod: IDeliveryMethod)
  {
     this.basketService.setShippingPrice(deliveryMethod);
  }

}
