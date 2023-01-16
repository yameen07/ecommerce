import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: LoginSignupComponent,
  },

  {
    path: 'Home',
    component: HomeComponent,
  },

  {
    path: 'Add',
    component: AddComponent,
  },

  {
    path: 'Cart',
    component: CartComponent,
  },

  {
    path: 'Wishlist',
    component: WishlistComponent,
  },

  {
    path: 'Checkout',
    component: CheckoutComponent,
  },

  {
    path: 'Orders',
    component: OrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
