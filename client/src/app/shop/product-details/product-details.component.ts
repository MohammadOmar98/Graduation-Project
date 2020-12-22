import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
   galleryOptions: NgxGalleryOptions[];
   galleryImages: NgxGalleryImage[];

  constructor(private shopService: ShopService , private activateRoute: ActivatedRoute,
              private bcService: BreadcrumbService, private basketService: BasketService, private wishListService: WishlistService) {
   this.bcService.set('@productDetails', '');
   }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.loadProduct();
    this.activateRoute.data.subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.product = data['product'];
    });

    this.galleryOptions = [
      {
        previewZoom: true,
        imageSize: 'contain',
        width: '500px',
        height: '700px',
        layout: 'thumbnails-right',
        imagePercent: 100,
        thumbnailsColumns: 4,
        thumbnailSize: 'contain',
        thumbnailsPercent: 70,
        imageAnimation: NgxGalleryAnimation.Fade,
      }
    ];
    this.galleryImages = this.getImages();
  }

  // tslint:disable-next-line:typedef
  getImages(){
   const imageUrls = [];
   // tslint:disable-next-line:prefer-for-of
   for (let i = 0; i < this.product.photos.length; i++) {
       imageUrls.push({
         small: this.product.photos[i].url,
         medium: this.product.photos[i].url,
         big: this.product.photos[i].url,
         description: this.product.description
       });
   }
   return imageUrls;
  }

  // tslint:disable-next-line:typedef
  addItemtoBasket() {
   this.basketService.addItemToBasket(this.product, this.quantity);
  }

  // tslint:disable-next-line:typedef
  incrementQuantity() {
    this.quantity++;
  }

  // tslint:disable-next-line:typedef
  decrementQuantity() {
    if (this.quantity > 1) {

      this.quantity--;

    }
  }

   // tslint:disable-next-line:typedef
   addItemToWishList(){
    this.wishListService.addItemToWishList(this.product);
  }

  // tslint:disable-next-line:typedef
  // loadProduct(){
  //   this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(product => {
  //     this.product = product;
  //     this.bcService.set('@productDetails', product.name);
  //   }, error => {
  //     console.log(error);
  //   });
  // }


}
