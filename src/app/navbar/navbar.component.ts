import { Component, OnChanges, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnChanges {
  constructor(private navbarService: NavbarService) {
    this.navbarService.subscribeToCart().subscribe((val) => {
      this.cartValue = new Array().concat(this.navbarService.cart).length;
    });
  }
  cartValue: number = 0;
  ngOnInit(): void {
    console.log(new Array().concat(this.navbarService.cart).length);
  }
  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.navbarService.subscribeToCart().subscribe((val) => {
      this.cartValue = new Array().concat(this.navbarService.cart).length;
    });
  }
}
