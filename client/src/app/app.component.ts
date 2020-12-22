import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';
import { WishlistService } from './wishlist/wishlist.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'My Store';

  constructor(private basketService: BasketService, private wishListService: WishlistService, private accountService: AccountService){}

  ngOnInit(): void {
   this.loadBasket();
   this.loadWishList();
   this.loadCurrentUser();
  }


  // tslint:disable-next-line:typedef
  loadCurrentUser() {
    const token = localStorage.getItem('token');

    this.accountService.loadCurrentUser(token).subscribe(() => {
         console.log('loaded user');
       }, error => {
         console.log(error);
       });

  }

  // tslint:disable-next-line:typedef
  loadBasket(){
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
     this.basketService.getBasket(basketId).subscribe(() => {
       console.log('initialised basket');
     }, error => {
       console.log(error);
     });
   }
  }

   // tslint:disable-next-line:typedef
   loadWishList(){
    const wishListId = localStorage.getItem('wishlist_id');
    if (wishListId) {
     this.wishListService.getWishlist(wishListId).subscribe(() => {
       console.log('initialised wishlist');
     }, error => {
       console.log(error);
     });
   }
  }
}
