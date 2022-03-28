import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Trips } from '../trips.model'

@Injectable({
  providedIn: 'root'
})
export class ShowViajeService {

  private dbPath = "/trips";
  userRef: AngularFirestoreCollection<Trips>;

  constructor(private db: AngularFirestore) {
    
    this.userRef = db.collection(this.dbPath);
  }

  readAll(){
    const userCosas = 
    (this.userRef.get()).forEach((doc)=>{
      console.log(doc.docChanges())
    })
  }

   
}
