import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  cart: ReplaySubject<any[]> = JSON.parse(localStorage.getItem('cart') || '[]');
  constructor() {}
  subscriberCart() {
    return this.setStorage().subscribe((val) => (this.cart = val));
  }
  setStorage(): Observable<any> {
    return new Observable<any>((observer: any) => {
      observer.next(JSON.parse(localStorage.getItem('cart') || '[]'));
      console.log(observer);
      return JSON.parse(localStorage.getItem('cart') || '[]');
    });
  }
  subscribeToCart(): Observable<any> {
    console.log(this.cart);
    return of(this.cart);
  }
}
