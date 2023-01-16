import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire/compat';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { LoginComponent } from './login-signup/login/login.component';
import { SignupComponent } from './login-signup/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FirebaseService } from './services/firebase.service';
import { AddComponent } from './add/add.component';
import { CategoryComponent } from './add/category/category.component';
import { SubCategoryComponent } from './add/sub-category/sub-category.component';
import { DataComponent } from './add/data/data.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { EditComponent } from './add/edit/edit.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { UsersComponent } from './add/users/users.component';
import { AdminOrdersComponent } from './add/admin-orders/admin-orders.component';

const config = {
  apiKey: 'AIzaSyAtvGLdRge6siivvfJ3O5gAE7_xtg9PTnE',
  authDomain: 'ecommerce-50e79.firebaseapp.com',
  projectId: 'ecommerce-50e79',
  storageBucket: 'ecommerce-50e79.appspot.com',
  messagingSenderId: '730149552767',
  appId: '1:730149552767:web:137af37b1552b7f222754a',
  measurementId: 'G-WTTY0Y0TSC',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AddComponent,
    CategoryComponent,
    SubCategoryComponent,
    DataComponent,
    CartComponent,
    WishlistComponent,
    EditComponent,
    CheckoutComponent,
    OrdersComponent,
    UsersComponent,
    AdminOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    FormsModule,
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
