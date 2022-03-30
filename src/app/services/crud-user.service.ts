import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
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
