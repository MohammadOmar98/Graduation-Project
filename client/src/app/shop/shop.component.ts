import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/ProductType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];
  constructor(private shopService: ShopService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
   this.getProducts();
   this.getBrands();
   this.getTypes();
  }

  // tslint:disable-next-line:typedef
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response.data;
      this.shopParams.pageNumber = response.pageIndex;
      this.shopParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.brands = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.types = [{id: 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    });
  }


  // tslint:disable-next-line:typedef
  onBrandIdSelected(brandId: number){
   this.shopParams.brandId = brandId;
   this.shopParams.pageNumber = 1;
   this.getProducts();
   }

  // tslint:disable-next-line:typedef
  onTypeIdSelected(typeId: number){
   this.shopParams.typeId = typeId;
   this.getProducts();
   }

   // tslint:disable-next-line:typedef
   onSortSelected(sort: string){
     this.shopParams.sort = sort;
     this.getProducts();
   }

   // tslint:disable-next-line:typedef
   onPageChanged(event: any) {
     if (this.shopParams.pageNumber !== event){
        this.shopParams.pageNumber = event;
        this.getProducts();
  }
   }

   // tslint:disable-next-line:typedef
   onSearch(){
     this.shopParams.search = this.searchTerm.nativeElement.value;
     this.shopParams.pageNumber = 1;
     this.getProducts();
   }

   // tslint:disable-next-line:typedef
   onReset(){
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
   }


}
