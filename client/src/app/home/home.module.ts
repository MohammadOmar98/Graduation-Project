import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShopModule } from '../shop/shop.module';
import { ShopRoutingModule } from '../shop/shop-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CarouselModule,
    ShopModule,
    ShopRoutingModule,
    CarouselModule
  ],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
