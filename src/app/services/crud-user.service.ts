import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CrudUserService {

  db!: Firestore
  constructor(db: Firestore) {
    this.db = db;
  }

  public create(user: User): Boolean{
    const res = collection(this.db, 'users')
    addDoc(res, JSON.parse(JSON.stringify(user)));
    return true;
  }

  public read(email: String){
    return true;
  }

  public update(email: String, user: User): Boolean{
    return true;
  }

  public delete(email: String): Boolean{
    return true;
  }

}
