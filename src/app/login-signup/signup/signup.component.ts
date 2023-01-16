import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSignedIn: boolean = false;
  isChecked: boolean = false;

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }
    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      secretkey: new FormControl(null, [Validators.minLength(8)]),
    });
  }

  async onSubmit() {
    if (this.isChecked) {
      if (this.signupForm.value.secretkey === '12345678') {
        this.signUp(
          this.signupForm.value.name,
          this.signupForm.value.email,
          this.signupForm.value.password
        );
        this.toastr.success('User Created');
      } else {
        this.toastr.error('enter valid key');
      }
    } else {
      this.signUp(
        this.signupForm.value.name,
        this.signupForm.value.email,
        this.signupForm.value.password
      );
      this.toastr.success('User Created');
    }
  }

  async signUp(name: string, email: string, password: string) {
    await this.firebaseService.signUp(email, password, this.isChecked, name);
  }
  checkValue() {
    this.isChecked = !this.isChecked;
  }
}
