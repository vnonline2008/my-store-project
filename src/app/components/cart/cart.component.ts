import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  data!: Cart[];
  totalPrice: number = 0;
  name: string = '';
  email: string = '';
  credit: string = '';

  constructor(private cartSerivce: CartService, private router: Router) {}

  ngOnInit(): void {
    const jsonData = localStorage.getItem('cartItems');
    this.data = jsonData ? JSON.parse(jsonData) : [];
    this.totalPrice = this.calculateTotalPrice();
  }

  changeAmount(item: Cart) {
    if (item?.quantity <= 0) {
      this.data = this.cartSerivce.removeCart(item);
      alert(`Remove ${item.name} from carts`);
    }
    this.cartSerivce.updatequantity(item);
    this.totalPrice = this.calculateTotalPrice();
  }

  submitOrder() {
    const info = { name: this.name, totalPrice: this.totalPrice };
    this.router.navigate(['/confirmation'], { queryParams: info});
  }

  private calculateTotalPrice(): number {
    const total = this.data.reduce((prev, current)  => prev + (current.quantity * current.price), 0);
    return Math.round((total + Number.EPSILON) * 100) / 100;
  }
}
