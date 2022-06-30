import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() cartValue: number = JSON.parse(localStorage.getItem('cart') || '[]')
    .length;
  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {}
}
