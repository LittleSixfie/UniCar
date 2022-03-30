import { Injectable } from '@angular/core';

import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { doc, getDoc } from 'firebase/firestore';

import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShowViajeService {
  trips$: Observable<any[]>;
  firestore: Firestore;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
    this.trips$ = collectionData(collection(this.firestore, 'trips'));
  }

  read(string: string):any[any]{
    const docRef = collection(this.firestore, 'trips');
    const dbInstance = doc(this.firestore, ("trips/"+string));
    getDoc(dbInstance)
      .then((response) => {
        console.log(response.data());
        if (response.data() == undefined) {
          console.log('dentro')
          return undefined;
        }
        return response.data();
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}
