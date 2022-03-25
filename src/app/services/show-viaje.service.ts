import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ShowViajeService {
  items?: Observable<any[]>;
  constructor(firestore: AngularFirestore, private db: AngularFireDatabase) {
    this.items = firestore.collection('trips').snapshotChanges();
    this.items.subscribe(params => {
      console.log(params); 
   });
    this.items.forEach(element => {
      console.log('bucle1')
      console.log(element[0]);
    });

  }
   
}
