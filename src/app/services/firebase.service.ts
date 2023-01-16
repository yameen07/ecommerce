import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import dataTypes from './dataType';
import category from './category';
import subCategory from './subCategory';

import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  query,
  doc,
  docData,
  deleteDoc,
  updateDoc,
  DocumentReference,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  uid: string;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: Firestore
  ) {}

  async signUp(
    email: string,
    password: string,
    isAdmin: boolean,
    name: string
  ) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const productRef = collection(this.firestore, 'users');
        addDoc(productRef, {
          name: name,
          email: JSON.stringify(res.user.email),
          isAdmin: isAdmin,
        });
      });
  }

  async signIn(email: string, password: string) {
    await this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.uid = res.user.uid;
      });
  }

  logout() {
    this.firebaseAuth.signOut();
  }

  addData(product: {}, location: string) {
    const productRef = collection(this.firestore, location);
    return addDoc(productRef, product);
  }
  getData(type: string): Observable<any[]> {
    const productRef = collection(this.firestore, type);
    return collectionData(productRef, { idField: 'uid' }) as Observable<any[]>;
  }

  deleteData(data, type: string) {
    const productRef = doc(this.firestore, `${type}/${data.uid}`);
    return deleteDoc(productRef);
  }

  updateData(data) {
    const productRef = doc(this.firestore, `products/${data.uid}`);
    return updateDoc(productRef, {
      title: data.title,
      category: data.category,
      subcategory: data.subcategory,
      price: data.price,
    });
  }
}
