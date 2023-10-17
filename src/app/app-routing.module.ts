import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { ProductItemDetailComponent } from './components/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: "", component: ProductListComponent, title: "Welcome my store"},
  { path: "cart", component: CartComponent, title: "Your product order", },
  { path: "productList", component: ProductListComponent, title: "Product item list" },
  { path: "productDetail", component: ProductItemDetailComponent, title: "Product detail"},
  { path: "confirmation", component: ConfirmationComponent, title: "Product confirmation"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
