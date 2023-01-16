import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import category from '../../services/category';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean = false;
  categories: category[] = [];
  submitted = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.firebaseService.getData('categories').subscribe((res: category[]) => {
      this.categories = res;

      this.isLoading = false;
    });

    this.form = new FormGroup({
      category: new FormControl(null, [Validators.required]),
    });
  }

  saveData(): void {
    this.firebaseService.addData(
      { name: this.form.value.category },
      'categories'
    );
    this.submitted = true;
  }
  newData(): void {
    this.submitted = false;
    this.form.value.category = null;
  }
  delete(data) {
    this.firebaseService.deleteData(data, 'categories');
  }
}
