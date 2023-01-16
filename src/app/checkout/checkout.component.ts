import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import dataTypes from '../services/dataType';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  products: dataTypes[] = [];
  details = { name: '', address: '', city: '', pincode: '', phone: null };
  isLoading: boolean = false;
  uid: string;
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
        if (localStorage.getItem('orders')) {
          if (localStorage.getItem('orders').length != 0) {
            this.products = JSON.parse(localStorage.getItem('orders'));
            this.retrive();
          }
        }
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  retrive() {
    this.totalItems = 0;
    this.totalPrice = 0;
    for (let i of this.products) {
      this.totalPrice = +this.totalPrice + +i.price;
      this.totalItems = this.totalItems + 1;
    }
    this.isLoading = false;
  }

  order() {
    this.firebaseService.addData(
      { id: JSON.parse(this.uid), details: this.details, order: this.products },
      'orders'
    );
    for (let i of this.products) {
      this.firebaseService.deleteData(i, 'cart');
    }
    this.toastr.success('Order Placed');
    this.router.navigate(['Home']);
  }

  cancel() {
    localStorage.removeItem('orders');
    this.router.navigate(['Home']);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('orders');
  }
}
