import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import subCategory from '../../services/subCategory';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
})
export class SubCategoryComponent implements OnInit {
  form: FormGroup;
  category = [];
  submitted = false;
  isLoading: boolean = false;
  subcategories: subCategory[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.firebaseService
      .getData('subcategories')
      .subscribe((res: subCategory[]) => {
        this.subcategories = res;

        this.isLoading = false;
      });

    this.firebaseService.getData('categories').subscribe((data) => {
      this.category = data;
    });
    this.form = new FormGroup({
      category: new FormControl(null),
      subcategory: new FormControl(null, [Validators.required]),
    });
  }
  categoryData(data) {
    this.form.value.category = data.target.value;
  }

  saveData(): void {
    this.firebaseService.addData(
      { category: this.form.value.category, name: this.form.value.subcategory },
      'subcategories'
    );
    this.submitted = true;
  }
  newData(): void {
    this.submitted = false;
    this.form.value.name = '';
    this.form.value.subcategory = '';
  }
  delete(data) {
    this.firebaseService.deleteData(data, 'subcategories');
  }
}
