import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistComponent } from './wishlist.component';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [WishlistComponent],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    CoreModule
  ]
})
export class WishlistModule { }
