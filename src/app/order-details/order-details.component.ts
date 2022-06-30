import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  cart: Array<any> = JSON.parse(localStorage.getItem('cart') || '[]');
  personName: string = '';
  deliveryAddress: string = '';
  // "productsOrdered":

  total = this.cart.reduce(
    (previousValue, currentValue) => previousValue + currentValue.total,
    0
  );
  totalItems = this.cart.reduce(
    (previousValue, currentValue) => previousValue + currentValue.qty,
    0
  );

  onclickSubmit = async () => {
    console.log('first');
    const body = {
      personName: this.personName,
      deliveryAddress: this.deliveryAddress,
      productsOrdered: this.cart.map((each) => ({
        productID: each._id,
        qty: each.qty,
        price: each.price,
        total: each.total,
      })),
      orderTotal: this.total,
    };
    this.dataService.postData(body).subscribe((res: any) => console.log(res));
  };
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}
}
