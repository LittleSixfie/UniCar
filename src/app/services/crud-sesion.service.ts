import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})

export class CRUDSesionService {

  private dbPath = '/users';
  userRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
  }

  create(user: User){
    return this.userRef?.add({...user});
  }
}
