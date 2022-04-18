import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Trip } from '../models/trips.model'
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';

 

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  db : Firestore;
  

  constructor(db: Firestore) {
    this.db = db;
  }

   public create(trip: Trip): Boolean{
    const res = collection(this.db, "trips")
    addDoc(res, JSON.parse(JSON.stringify(trip)));
    return true;
  }

  

  
}
