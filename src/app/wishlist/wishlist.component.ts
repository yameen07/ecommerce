import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import dataTypes from '../services/dataType';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
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
        this.uid = res.uid;
      } else {
        this.router.navigate(['Home']);
      }
    });
    this.isLoading = true;
    this.firebaseService
      .getData('wishlist')
      .pipe(map((wishlist) => wishlist.filter((s) => s.id === this.uid)))
      .subscribe((res: dataTypes[]) => {
        this.products = res;
        if (this.products.length != 0) {
          this.isContent = true;
        }
        for (let i of this.products) {
          this.totalPrice = +this.totalPrice + +i.price;
          this.totalItems = this.totalItems + 1;
        }
        this.isLoading = false;
      });
  }

  async delete(data: dataTypes) {
    await this.firebaseService.deleteData(data, 'wishlist');
  }
  addCart(data: dataTypes) {
    console.log(data);
    if (this.uid) {
      data.id = this.uid;
      this.firebaseService.addData(data, 'cart');
      this.toastr.success('Item added to cart');
    } else {
      var localData = [];
      localData = JSON.parse(localStorage.getItem('cart')) || [];
      localData.push(data);
      localStorage.setItem('cart', JSON.stringify(localData));
      this.toastr.success('Item added to cart');
    }
  }
}
