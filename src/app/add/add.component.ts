import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  selection: string = 'category';
  user: {
    email: string;
    isAdmin: boolean;
    name: string;
  }[] = [];
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.auth.authState.subscribe((res) => {
      if (!res) {
        this.router.navigate(['Home']);
      } else {
        this.firebaseService
          .getData('users')
          .pipe(
            map((user) => user.filter((s) => JSON.parse(s.email) === res.email))
          )
          .subscribe((response) => {
            if (response) {
              for (let user of response) {
                if (user.isAdmin == false) {
                  this.router.navigate(['Home']);
                }
              }
            }
          });
      }
    });
  }

  select(selection) {
    this.selection = selection;
  }
}
