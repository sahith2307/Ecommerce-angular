import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Array<any> = JSON.parse(localStorage.getItem('cart') || '[]');
  total = this.cart.reduce(
    (previousValue, currentValue) => previousValue + currentValue.total,
    0
  );

  constructor() {}
  changeQuantity = (id: string, qtyValue: number) => {
    const findItem = this.cart.find((each) => each._id === id);
    const items = this.cart?.map((each) => {
      if (each._id === id) {
        return {
          ...each,
          qty: Number(qtyValue),
          total: Number(each?.price) * Number(qtyValue),
        };
      } else {
        return each;
      }
    });

    localStorage.setItem('cart', JSON.stringify(items));
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.total = this.cart.reduce(
      (previousValue, currentValue) => previousValue + currentValue.total,
      0
    );
  };
  removeFormCart = (id: string) => {
    const removeItem = this.cart.filter((each) => each._id !== id);
    localStorage.setItem('cart', JSON.stringify(removeItem));
    this.cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.total = this.cart.reduce(
      (previousValue, currentValue) => previousValue + currentValue.total,
      0
    );
  };
  ngOnInit(): void {}
}
