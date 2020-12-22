import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../basket/basket.service';
import { IBasketItem } from '../shared/models/basket';
import { IOrderItem } from '../shared/models/order';
import { IProduct } from '../shared/models/product';
import { IWishList, IWishListItem } from '../shared/models/wishlist';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  @Output() remove: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Input() items: IProduct[] = [];
  @Input() isWishList = true;
  wishlist$: Observable<IWishList>;
  constructor(private wishListService: WishlistService , private basketService: BasketService ) { }

  ngOnInit(): void {
    this.wishlist$ = this.wishListService.wishlist$;
  }

  // tslint:disable-next-line:typedef
  removeWishlistItem(item: IProduct) {
    this.wishListService.removeItemFromWishList(item);
  }

  // tslint:disable-next-line:typedef
 addItemtoBasket(item: IProduct) {
  this.basketService.addItemToBasket(item);
 }

  // tslint:disable-next-line:typedef
  addWishlistItemToBasket(item: IProduct){
    this.addItemtoBasket(item);
    this.removeWishlistItem(item);
  }



}
