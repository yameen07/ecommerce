import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import dataTypes from '../services/dataType';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: dataTypes[] = [];
  allProducts: dataTypes[] = [];
  isContent: boolean = false;
  isLoading: boolean = false;
  uid: string;
  data: dataTypes;
  totalPrice: number = 0;
  totalItems: number = 0;

  constructor(
    private firebaseService: FirebaseService,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.auth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.uid = JSON.stringify(res.uid);
        this.firebaseService
          .getData('cart')
          .pipe(
            map((cart) => cart.filter((s) => JSON.stringify(s.id) === this.uid))
          )
          .subscribe((res: dataTypes[]) => {
            this.products = res;
            this.retrive();
          });
      } else {
        var localData = localStorage.getItem('cart');
        this.products = JSON.parse(localData);

        this.retrive();
      }
    });
  }

  retrive() {
    this.isContent = false;
    this.totalItems = 0;
    this.totalPrice = 0;
    if (this.products) {
      if (this.products.length != 0) {
        this.isContent = true;
        for (let i of this.products) {
          this.totalPrice = +this.totalPrice + +i.price;
          this.totalItems = this.totalItems + 1;
        }
      }
    }

    this.isLoading = false;
  }
  delete(data: dataTypes) {
    if (this.uid) {
      this.firebaseService.deleteData(data, 'cart');
      this.retrive();
    } else {
      var localData = [];

      for (let item of this.products) {
        if (item != data) {
          localData.push(item);
        }
      }
      localStorage.setItem('cart', JSON.stringify(localData));

      this.products = JSON.parse(localStorage.getItem('cart'));
      this.retrive();
    }
  }

  checkout() {
    if (this.uid) {
      var localData = [];
      localData = JSON.parse(localStorage.getItem('orders')) || [];

      for (var i of this.products) {
        localData.push(i);
        localStorage.setItem('orders', JSON.stringify(localData));
      }
      this.router.navigate(['Checkout']);
    } else {
      this.toastr.warning('Please Login To Checkout');
      this.router.navigate(['/']);
    }
  }
}
