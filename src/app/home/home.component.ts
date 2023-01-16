import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import dataTypes from '../services/dataType';
import category from '../services/category';
import subCategory from '../services/subCategory';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: dataTypes[] = [];
  productList: dataTypes[] = [];
  categories: category[] = [];
  subcategories: subCategory[] = [];
  activeCategory: boolean = false;
  isLoading: boolean = false;
  categoryName: string;
  uid: string;
  isView: boolean = false;
  itemData: dataTypes;
  search: string = '';
  sortDescription: boolean = false;
  sortPrice: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private auth: AngularFireAuth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.firebaseService.getData('products').subscribe((res: dataTypes[]) => {
      this.products = res;
      this.productList = res;
    });
    this.firebaseService.getData('categories').subscribe((res: category[]) => {
      this.categories = res;

      this.isLoading = false;
    });
    this.auth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.uid = res.uid;
      }
    });
  }

  onClickCategory(name: string) {
    this.products = this.productList;
    this.firebaseService
      .getData('subcategories')
      .pipe(
        map((subcategory) => subcategory.filter((s) => s.category === name))
      )
      .subscribe((res: subCategory[]) => {
        this.subcategories = res;
      });

    this.products = this.products.filter((s) => s.category === name);

    this.categoryName = name;
    this.activeCategory = true;
  }

  onClickSubCategory(name: string) {
    this.products = this.productList;

    this.products = this.products.filter((s) => s.subcategory === name);

    this.categoryName = name;
    this.activeCategory = true;
  }

  addWishlist(data: dataTypes) {
    if (this.uid) {
      data.id = this.uid;
      this.firebaseService.addData(data, 'wishlist');
      this.toastr.success('Item added to wishlist');
    } else {
      this.toastr.warning('Please Login First');
      this.router.navigate(['/']);
    }
  }
  addCart(data: dataTypes) {
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
  checkout(data) {
    var localData = [];
    localData = JSON.parse(localStorage.getItem('orders')) || [];

    localData.push(data);
    localStorage.setItem('orders', JSON.stringify(localData));

    this.router.navigate(['Checkout']);
  }
  searchItem() {
    if (this.search == '') {
      this.products = this.productList;
    } else {
      this.products = this.products.filter((s) =>
        s.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
  sort(type) {
    this.products = this.productList;

    if (type == 'description') {
      if (this.sortDescription) {
        this.products = this.products.sort((a, b) =>
          a.description > b.description ? 1 : -1
        );
        this.sortDescription = !this.sortDescription;
      } else {
        this.products = this.products.sort((a, b) =>
          a.description < b.description ? 1 : -1
        );
        this.sortDescription = !this.sortDescription;
      }
    } else {
      if (this.sortPrice) {
        this.products = this.products.sort((a, b) =>
          a.price > b.price ? 1 : -1
        );
        this.sortPrice = !this.sortPrice;
      } else {
        this.products = this.products.sort((a, b) =>
          a.price < b.price ? 1 : -1
        );
        this.sortPrice = !this.sortPrice;
      }
    }
  }

  view(data) {
    this.isView = true;
    this.itemData = data;
  }
}
