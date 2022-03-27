import { getLocaleDateFormat } from '@angular/common';
import { Component } from '@angular/core';
import { observeInsideAngular } from '@angular/fire';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { connectFirestoreEmulator, DocumentReference, getFirestore, doc, getDoc } from 'firebase/firestore';
import { Observable, of, tap } from 'rxjs';

interface User {

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UniCar';
  user$: Observable<any[]>;
  firestore: Firestore;
  //favTripCounter: number;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
    //const db = getFirestore();
    //connectFirestoreEmulator(db, 'localhost', 8081);
    const coll = collection(this.firestore, 'users');
    this.user$ = collectionData(coll);

  }

  async getFavTrips(f: any, key?: any, value?: any) {
    //u.map((a: any,v: any) => console.log(a,v))
    //const t = u as DocumentReference;
    let list$: Observable<any[]> = of([""]);
    const a = f.favTrips as Map<any, any>;

    return a.forEach(async (v,k) => {
      const docRef = doc(this.firestore, k);
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
        console.log(docSnap.data())
        list$.pipe(tap(a => {
          a.push(docSnap.data())
        }))
      } else {
        console.log("No entra")
        list$.pipe(tap(a => {
          a.push("")
        }))
      }
    })

  }
    //docSnap.then(value => console.log(value.data()));
    // trip$.then(result => console.log(result.data()));

    // return referenciaViaje.get().then(result => result.data())
    getData() {
      const docRef = collection(this.firestore, 'trips')
      const dbInstance = doc(this.firestore, "trips/trip01");
      getDoc(dbInstance)
      .then((response) => {
        console.log(response.data())
      })
      .catch((err) => {
        alert(err.message)
      })
    }

  tipoDe(t: any) {
    console.log(t);
  }
}
