import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import dataType from '../../services/dataType';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  isLoading: boolean = false;
  products: dataType[] = [];
  productList: dataType[] = [];

  isEdit = false;
  search: string = '';
  data: dataType = {
    category: '',
    subcategory: '',
    title: '',
    description: '',
    price: null,
    image: ['', '', ''],
  };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.firebaseService.getData('products').subscribe((res: dataType[]) => {
      this.products = res;
      this.productList = res;
      this.isLoading = false;
    });
  }
  delete(data) {
    this.firebaseService.deleteData(data, 'products');
  }
  edit(data) {
    this.isEdit = true;
    this.data = data;
  }
  saveData() {
    this.firebaseService.updateData(this.data);
    this.isEdit = false;
  }
  searchItem() {
    if (this.search == '') {
      this.products = this.productList;
    } else {
      this.products = this.products.filter((s) =>
        s.description.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
}
