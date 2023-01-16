import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  isLogin = false;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  ngOnInit(): void {
    // this.auth.authState.subscribe((res) => {
    //   if (res && res.uid) {
    //     this.router.navigate(['Home']);
    //   }
    // });
  }

  redirect() {
    this.isLogin = !this.isLogin;
  }
}
