import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutAddressComponent } from './checkout-address/checkout-address.component';
import { CheckoutReviewComponent } from './checkout-review/checkout-review.component';
import { CheckoutDeliveryComponent } from './checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    CoreModule
  ],
  declarations: [CheckoutComponent, CheckoutAddressComponent,
     CheckoutReviewComponent, CheckoutDeliveryComponent, CheckoutPaymentComponent, CheckoutSuccessComponent]
})
export class CheckoutModule { }
