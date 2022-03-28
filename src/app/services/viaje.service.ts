import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Trip } from '../models/trips.model'
@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private dbPath = "/trips";
  userRef: AngularFirestoreCollection<Trip>;

  constructor(private db: AngularFirestore) {
    this.userRef = db.collection(this.dbPath);
   }

   create(trip: Trip){
    return this.userRef?.add({...trip});
  }
}
