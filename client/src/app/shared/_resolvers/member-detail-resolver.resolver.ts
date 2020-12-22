import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShopService } from 'src/app/shop/shop.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailResolverResolver implements Resolve<IProduct> {
constructor(private shopService: ShopService , private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct> {
    // tslint:disable-next-line:no-string-literal
    return this.shopService.getProduct(route.params['id']).pipe(
      catchError(error => {
        console.log(error);
        this.router.navigate(['/shop']);
        return of(null);
      })
    );
  }
}
