import { Component, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../shared/models/product';
import { HomeService } from './home.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Input() productByType1: IProduct[];
  @Input() productByType: IProduct[];
  @Input() productByType2: IProduct[];
  @Input() productByType3: IProduct[];
  constructor(private homeService: HomeService) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    autoplaySpeed: 700,
    dots: true,
    dotsData: true,
    dotsEach: 1,
    dotsSpeed: 700,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      }
    },

  };





  // tslint:disable-next-line:typedef
  ngOnInit() {
   this.getProductsByType();
   this.getProductsByType1();
   this.getProductsByType2();
   this.getProductsByType3();
  }

  // tslint:disable-next-line:typedef
  getProductsByType3() {
    this.homeService.getProductsby_type3().subscribe(response => {
      this.productByType3 = response.data;
    }, error => {
      console.log(error);
    });
  }
  // tslint:disable-next-line:typedef
  getProductsByType2() {
    this.homeService.getProductsby_type2().subscribe(response => {
      this.productByType2 = response.data;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  getProductsByType1(){
    this.homeService.getProductsby_type1().subscribe(response => {
      this.productByType1 = response.data;
    }, error => {
      console.log(error);
    });
  }

  // tslint:disable-next-line:typedef
  getProductsByType(){
    this.homeService.getProductsby_type().subscribe(response => {
      this.productByType = response.data;
    }, error => {
      console.log(error);
    });
  }





}
