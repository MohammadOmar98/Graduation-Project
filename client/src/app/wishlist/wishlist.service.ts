import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from '../shared/models/product';
import { IWishList, IWishListItem, WishList } from '../shared/models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  baseUrl = environment.apiUrl;
  private wishlistSource = new BehaviorSubject<IWishList>(null);
  wishlist$ = this.wishlistSource.asObservable();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  // tslint:disable-next-line:typedef
  getWishlist(id: string) {
    return this.http.get(this.baseUrl + 'wishlist?id=' + id)
     .pipe(
       map((wishlist: IWishList) => {
         this.wishlistSource.next(wishlist);
         console.log(this.getCurrentWishListValue());
       })
     );
  }

  // tslint:disable-next-line:typedef
  setWishList(wishlist: IWishList) {
    return this.http.post(this.baseUrl + 'wishlist', wishlist).subscribe((response: IWishList) => {
      this.wishlistSource.next(response);
    // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

   // tslint:disable-next-line: typedef
   removeItemFromWishList(item: IProduct) {
    const wishlist = this.getCurrentWishListValue();
    if (wishlist.items.some(x => x.id === item.id)) {
      wishlist.items = wishlist.items.filter(i => i.id !== item.id);
      if (wishlist.items.length > 0) {
        this.setWishList(wishlist);
      } else {
        this.deleteWishlist(wishlist);
      }
    }
  }

  // tslint:disable-next-line:typedef
  deleteWishlist(wishList: IWishList) {
    return this.http.delete(this.baseUrl + 'wishlist?id=' + wishList.id).subscribe(() => {
      this.wishlistSource.next(null);
      localStorage.removeItem('wishlist_id');
    // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line: typedef
  deleteLocalWishlist(id: string) {
    this.wishlistSource.next(null);
    localStorage.removeItem('wishlist_id');
  }

  // tslint:disable-next-line:typedef
  getCurrentWishListValue() {
   return this.wishlistSource.value;
  }

  // tslint:disable-next-line:typedef
  addItemToWishList(item: IProduct, quantity = 1) {
    const itemToAdd: IWishListItem = this.mapProductItemToWishlistItem(item, quantity);
    const wishList = this.getCurrentWishListValue() ?? this.createWishList();
    console.log(wishList);
    wishList.items = this.addOrUpdateItem(wishList.items, itemToAdd, quantity);
    this.setWishList(wishList);
  }

  private addOrUpdateItem(items: IWishListItem[], itemToAdd: IWishListItem, quantity: number): IWishListItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if (index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    else if (index === 1) {
      items[index].quantity += quantity;
    }

    return items;
  }

  createWishList(): IWishList {
    const wishlist = new WishList();
    localStorage.setItem('wishlist_id', wishlist.id);
    return wishlist;
  }

  private mapProductItemToWishlistItem(item: IProduct, quantity: number): IWishListItem {
   return {
    id: item.id,
    productName: item.name,
    price: item.price,
    pictureUrl: item.pictureUrl,
    quantity,
    brand: item.productBrand,
    type: item.productType
   };
  }

}
