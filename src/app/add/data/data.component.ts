import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import dataTypes from '../../services/dataType';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  category = [];
  subCategory = [];
  data: dataTypes = {
    category: '',
    subcategory: '',
    title: '',
    description: '',
    price: null,
    image: ['', '', ''],
  };
  submitted = false;
  isActiveCategory: boolean = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getData('categories').subscribe((data) => {
      this.category = data;
    });
  }

  saveData(): void {
    this.firebaseService.addData(this.data, 'products');
    this.submitted = true;
  }
  newData(): void {
    this.submitted = false;
    this.data = {
      category: '',
      subcategory: '',
      title: '',
      description: '',
      price: null,
      image: ['', '', ''],
    };
  }
  categoryData(data) {
    this.isActiveCategory = true;
    this.data.category = data.target.value;
    this.firebaseService
      .getData('subcategories')
      .pipe(
        map((subcategory) =>
          subcategory.filter((s) => s.category === this.data.category)
        )
      )
      .subscribe((data) => {
        this.subCategory = data;
      });
  }
  subCategoryData(data) {
    this.data.subcategory = data.target.value;
  }
  isDisabled(data) {
    if (
      data.category == '' ||
      data.subcategory == '' ||
      data.title == '' ||
      data.description == '' ||
      data.price == null
    ) {
      return true;
    }
    return false;
  }
}
