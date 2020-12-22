import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopRoutingModule } from './shop-routing.module';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { MemberDetailResolverResolver } from '../shared/_resolvers/member-detail-resolver.resolver';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    NgxGalleryModule,
    CoreModule
  ],
  declarations: [ShopComponent, ProductItemComponent, ProductDetailsComponent],
  exports: [ProductItemComponent],

  providers: [
    MemberDetailResolverResolver
  ]
})
export class ShopModule { }