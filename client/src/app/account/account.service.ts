import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAdress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
   currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }



  // tslint:disable-next-line:typedef
  loadCurrentUser(token: string){
   if (token === null) {
     this.currentUserSource.next(null);
     return of(null);
   }

   let headers = new HttpHeaders();
   headers = headers.set('Authorization', `Bearer ${token}` );

   return this.http.get(this.baseUrl + 'account', {headers}).pipe(
     map((user: IUser) => {
       if (user){
         localStorage.setItem('token', user.token);
         this.currentUserSource.next(user);
       }
     })
   );
  }

  // tslint:disable-next-line:typedef
  login(values: any): Observable<void>{
   return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line:typedef
  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  // tslint:disable-next-line:typedef
  logout() {
    localStorage.removeItem('token');
    this.currentUserSource = null;
    this.router.navigateByUrl('/');
  }

  // tslint:disable-next-line:typedef
  checkEmailExsists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  // tslint:disable-next-line:typedef
  getUserAddress() {
     return this.http.get<IAdress>(this.baseUrl + 'account/address');
  }

  // tslint:disable-next-line:typedef
  updateUserAddress(address: IAdress) {
     return this.http.put<IAdress>(this.baseUrl + 'account/address', address);
  }


}
