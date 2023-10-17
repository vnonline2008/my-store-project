import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private key: string = 'cartItems';

  constructor() { }

  private getDataFromLocalStorage(): Cart[] {
    const jsonData = localStorage.getItem(this.key);
    return jsonData ? JSON.parse(jsonData) : [];
  }

  addNewCart(product: Product, quantity: number) {
    const carts: Cart[] = this.getDataFromLocalStorage();
    if (!carts.length) {
      const newCart: Cart = {...product, quantity: quantity};
      localStorage.setItem(this.key, JSON.stringify([newCart]));
    } else {
      const cartFind = carts.find(item => item.id === product.id);
      if (cartFind) {
        cartFind.quantity += quantity;
      } else {
          const newCart = {
            ...product,
            quantity: quantity
          }
          carts.push(newCart)
        }
      localStorage.setItem(this.key, JSON.stringify(carts));
    }
  }

  updatequantity(cart: Cart) {
    const carts: Cart[] = this.getDataFromLocalStorage();
    const storeLocal = carts.filter(item => {
      if (item.id === cart.id) {
        item.quantity = cart.quantity;
      }
      return item;
    });
    localStorage.setItem(this.key, JSON.stringify(storeLocal));
  }

  removeCart(cart: Cart): Cart[] {
    const carts: Cart[] = this.getDataFromLocalStorage();
    const storeLocal = carts.filter(item => item.id !== cart.id);
    localStorage.setItem(this.key, JSON.stringify(storeLocal));
    return storeLocal;
  }

  cleanCarts() {
    const carts: Cart[] = this.getDataFromLocalStorage();
    if (!!carts.length) {
      localStorage.removeItem(this.key);
    }
  }
}
