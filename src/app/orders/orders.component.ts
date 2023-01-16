import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  products = [];
  details = { name: '', address: '', city: '', pincode: '', phone: null };
  isLoading: boolean = false;
  uid: string;
  isContent: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private auth: AngularFireAuth,
    private router: Router,
    private tostr: ToastrService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.auth.authState.subscribe((res) => {
      if (res && res.uid) {
        this.uid = JSON.stringify(res.uid);
        this.firebaseService
          .getData('orders')
          .pipe(
            map((cart) => cart.filter((s) => JSON.stringify(s.id) === this.uid))
          )
          .subscribe((res) => {
            this.products = res;
            this.isLoading = false;
            if (this.products.length != 0) {
              this.isContent = true;
            }
          });
      } else {
        this.router.navigate(['']);
      }
    });
  }

  cancel(data) {
    this.firebaseService.deleteData(data, 'orders');
    this.tostr.success('Order Cancelled');
  }
}
