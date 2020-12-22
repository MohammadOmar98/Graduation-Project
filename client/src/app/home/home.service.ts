import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination } from '../shared/models/Pagination';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = 'https://localhost:5001/api/';

constructor(private http: HttpClient) { }

// tslint:disable-next-line:typedef
getProductsby_type()
{
  return this.http.get<IPagination>(this.baseUrl + 'products?typeId=1&&pageSize=1');
}

// tslint:disable-next-line:typedef
getProductsby_type1()
{
  return this.http.get<IPagination>(this.baseUrl + 'products?typeId=1&&pageSize=3');
}


// tslint:disable-next-line:typedef
getProductsby_type2()
{
  return this.http.get<IPagination>(this.baseUrl + 'products?typeId=2&&pageSize=3');
}

// tslint:disable-next-line:typedef
getProductsby_type3()
{
  return this.http.get<IPagination>(this.baseUrl + 'products?typeId=3&&pageSize=3');
}

}
