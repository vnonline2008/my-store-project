import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {

  @Input() product!: Product;
  @Output() onClick = new EventEmitter();
  options = [1, 2, 3, 4, 5, 6, 7, 8];
  quantity = 1;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addNewCart(this.product!, this.quantity);
    alert(`Added ${this.quantity} ${this.product.name} items to cart`);
  }

  onChange(value: string) {
    this.quantity = parseInt(value);
  }
}
