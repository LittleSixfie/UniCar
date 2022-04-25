import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Trip } from '../models/trips.model'
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
 

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  db : Firestore;
  

  constructor(db: Firestore) {
    this.db = db;
  }

   public async create(trip: Trip): Promise<string>{
    const res = collection(this.db, "trips")
    const id = addDoc(res, JSON.parse(JSON.stringify(trip)));
    let aux: string =""; 
    const id2 = collectionData(res,{idField: 'id'}) as 
    Observable<Trip>;
    
    await id.then(function(data){
      aux=data.id
      return data.id
    });
    return aux;
  }

  

  
}
