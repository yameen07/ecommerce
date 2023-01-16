import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  loggedIn: boolean = false;
  title = 'Ecommerce';
  isAdmin: boolean = true;
  userName: string;

  constructor(
    private firebaseService: FirebaseService,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.auth.authState.subscribe((res) => {
      this.loggedIn = false;

      if (res && res.uid) {
        this.loggedIn = true;
        var email = JSON.stringify(res.email);
        this.firebaseService.getData('users').subscribe((res) => {
          for (var i of res) {
            if (i.email === email) {
              this.isAdmin = i.isAdmin;
              this.userName = i.name;
            }
          }
        });
      }
    });
  }

  logout() {
    this.loggedIn = false;
    this.firebaseService.logout();
    location.reload();
  }
}
