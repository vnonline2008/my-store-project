import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  name: string = '';
  totalPrice: number = 0;

  constructor(private cartService: CartService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.name = params['name'];
      this.totalPrice = params['totalPrice'];
      this.cartService.cleanCarts();
    })
  }

}
