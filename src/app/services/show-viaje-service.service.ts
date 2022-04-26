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

  read(string: string):Promise<any>{
    const dbInstance = doc(this.firestore, ("trips/"+string));
    console.log("trips/"+string)
    return getDoc(dbInstance)
      
  }
}

@Injectable({
  providedIn: 'root'
})
export class ShowViajeServiceService {

  constructor() { }
}
