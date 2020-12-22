import { Component, OnInit, Input } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { WishlistService } from 'src/app/wishlist/wishlist.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;
  constructor(private basketService: BasketService , private wishlistService: WishlistService) { }

  ngOnInit(): void {
  }

 // tslint:disable-next-line:typedef
 addItemtoBasket() {
  this.basketService.addItemToBasket(this.product);
 }

  // tslint:disable-next-line:typedef
  addItemToWishList(){
    this.wishlistService.addItemToWishList(this.product);
  }

}
