import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { link } from 'fs';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;

  constructor(private basketService: BasketService, private router: Router, private accountService: AccountService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;

    // tslint:disable-next-line:only-arrow-functions
    window.addEventListener('scroll', () => {
        // tslint:disable-next-line:prefer-const
        let header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
      });

    // tslint:disable-next-line:prefer-const
    let marker: HTMLElement = document.querySelector('#marker');
    // tslint:disable-next-line:prefer-const
    let item = document.querySelectorAll('nav a');

    // tslint:disable-next-line:typedef
    function indicator(e) {
        marker.style.left = e.offsetLeft + 'px';
        marker.style.width = e.offsetWidth + 'px';
      }

    // tslint:disable-next-line:no-shadowed-variable
    item.forEach(link => {
        link.addEventListener('click', (e) => {
          indicator(e.target);
        });
      });



  }

  // tslint:disable-next-line:typedef
  logout() {
    this.accountService.logout();
  }

}
