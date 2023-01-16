import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: { name: string; email: string; isAdmin: boolean }[] = [];
  email: string;
  isOrders: boolean = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getData('users').subscribe((res) => {
      this.users = res;
    });
  }
}
