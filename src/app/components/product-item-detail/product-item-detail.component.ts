import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit{

  product!: Product | undefined;
  options = [1, 2, 3, 4, 5, 6, 7, 8];
  quantity = 1;
  leftArrowIcon = faArrowLeftLong;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartSerivce: CartService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      const productId = queryParams['id'];
      this.productService
              .getProducts()
                  .pipe(map(products => products.find(product => product.id === parseInt(productId))))
                  .subscribe(product => this.product = product);
    });
  }

  addToCart() {
    this.cartSerivce.addNewCart(this.product!, this.quantity);
    alert(`Added ${this.quantity} ${this.product?.name} items to cart`);
  }

  onChange(quantity: string) {
    this.quantity = parseInt(quantity);
  }
}
