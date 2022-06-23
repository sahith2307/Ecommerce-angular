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
    this.navBarService.subscribeToCart();
  };

  ngOnInit(): void {
    this.dataService.getData().subscribe((res: any) => {
      console.log(res.products);
      this.products = res.products;
    });
  }
}
