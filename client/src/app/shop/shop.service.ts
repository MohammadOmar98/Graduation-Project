import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/Pagination';
import { IType } from '../shared/models/ProductType';
import {map} from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

constructor(private http: HttpClient) { }

// tslint:disable-next-line: typedef
getProducts(shopParams: ShopParams)
{
  let params = new HttpParams();

  if (shopParams.brandId !== 0){
   params = params.append('brandId', shopParams.brandId.toString());
  }

  if (shopParams.typeId !== 0){
    params = params.append('typeId', shopParams.typeId.toString());
   }

  if (shopParams.search){
     params = params.append('search', shopParams.search);
   }

  params = params.append('sort', shopParams.sort);
  params = params.append('pageIndex', shopParams.pageNumber.toString());
  params = params.append('pageIndex', shopParams.pageSize.toString());

  return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
  .pipe(
    map(response => {
     return response.body;
    })
  );
}
// tslint:disable-next-line:typedef
getProduct(id: number){
  return this.http.get<IProduct>(this.baseUrl + 'products/' + id);

}

// tslint:disable-next-line: typedef
getBrands(){

 return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
}

// tslint:disable-next-line:typedef
getTypes(){

  return this.http.get<IType[]>(this.baseUrl + 'products/types');
}


}
