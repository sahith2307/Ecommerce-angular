import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private navBarService: NavbarService
  ) {}
  products: Array<any> = [];
  splicedProducts: Array<any> = [];
  cartNumber: number = JSON.parse(localStorage.getItem('cart') || '[]').length;
  pagination: Array<any> = [];

  paginationNumber = 5;
  number = 1;
  onClickNext = () => {
    if (this.number >= this.pagination[this.pagination.length - 1]) {
      this.number = this.pagination[this.pagination.length - 1];
    } else {
      this.number += 1;
    }
    this.spicedProducts();
  };
  onClickPrev = () => {
    if (this.number <= this.pagination[0]) {
      this.number = this.pagination[0];
    } else {
      this.number -= 1;
    }
    this.spicedProducts();
  };
  spicedProducts = () => {
    this.splicedProducts = this.products.slice(
      (this.number - 1) * this.paginationNumber,
      this.number * this.paginationNumber
    );
  };
  onClickPage = (number: number) => {
    this.number = number;
    this.splicedProducts = this.products.slice(
      (number - 1) * this.paginationNumber,
      number * this.paginationNumber
    );
  };
  setOrder = async (event: any) => {
    const order = event.target.value;
    if (order === 'asc') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (order === 'dec') {
      this.products.sort((a, b) => b.price - a.price);
    } else if (order === 'same') {
      this.dataService.getData().subscribe((res: any) => {
        this.products = res.products;
        this.spicedProducts();
      });
    }
    this.spicedProducts();
  };
  setPaginationNumber = (event: any) => {
    this.paginationNumber = Number(event.target.value);
    this.number = 1;
    const num = Math.ceil(this.products.length / this.paginationNumber);
    console.log(num, this.products.length / this.paginationNumber);
    this.pagination = [];
    for (let i = 1; i <= num; i++) {
      this.pagination.push(i);
    }
    this.spicedProducts();
  };
  getClass = (value: number) => {
    switch (value % 4) {
      case 0:
        return 'bg-info';
      case 1:
        return 'bg-success';
      case 2:
        return 'bg-warning';
      case 3:
        return 'bg-danger';
      default:
        return '';
    }
  };
  addToCart = (id: string, productData: any) => {
    const cart: Array<any> = JSON.parse(localStorage.getItem('cart') || '[]');
    const findItem = cart.find((each) => each._id === id);
    const items = cart.filter((each) => each._id !== id);

    const changePrductData = {
      ...findItem,
      qty: Number(findItem?.qty + 1),
      total: Number(findItem?.price) * (findItem?.qty + 1),
    };
    localStorage.setItem(
      'cart',
      JSON.stringify([
        ...items,
        findItem
          ? changePrductData
          : { ...productData, qty: 1, total: Number(productData.price) },
      ])
    );
    this.cartNumber = JSON.parse(localStorage.getItem('cart') || '[]').length;
  };

  ngOnInit(): void {
    this.dataService.getData().subscribe((res: any) => {
      this.products = res.products;
      this.splicedProducts = this.products.slice(
        (this.number - 1) * this.paginationNumber,
        this.number * this.paginationNumber
      );
      const num = Math.ceil(this.products.length / this.paginationNumber);
      console.log(num, this.products.length / this.paginationNumber);
      for (let i = 1; i <= num; i++) {
        this.pagination.push(i);
      }
    });
  }
}
