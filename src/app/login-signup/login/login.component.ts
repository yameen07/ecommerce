import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signupForm: FormGroup;
  isSignedIn: boolean = false;
  users: { email: string; isAdmin: boolean }[] = [];
  email: string;
  isAdmin: boolean;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.firebaseService
      .getData('users')
      .subscribe((res: { email: string; isAdmin: boolean }[]) => {
        this.users = res;
      });

    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  async onSubmit() {
    await this.signIn(
      this.signupForm.value.email,
      this.signupForm.value.password
    );
  }

  async signIn(email: string, password: string) {
    await this.firebaseService.signIn(email, password);

    if (this.firebaseService) {
      var uid = this.firebaseService.uid;
      if (localStorage.getItem('cart')) {
        if (localStorage.getItem('cart').length != 0) {
          var addCart = [];
          addCart = JSON.parse(localStorage.getItem('cart'));

          for (let i of addCart) {
            i.id = uid;
            this.firebaseService.addData(i, 'cart');
          }
          localStorage.removeItem('cart');
          this.router.navigate(['Cart']);
        }
      } else {
        this.router.navigate(['Home']);
      }
    }
  }
}
