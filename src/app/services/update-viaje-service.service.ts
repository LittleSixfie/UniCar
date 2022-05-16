import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { doc, setDoc } from 'firebase/firestore';
import { Trip } from '../models/trips.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateViajeServiceService {

  db : Firestore;

  constructor(db: Firestore, private router:Router) {
    this.db = db;
   
  }

  updateTrip(trip: Trip, id: string){
    const tripDocRef = doc(this.db, 'trips/'+id);
    setDoc(tripDocRef,trip);
    this.router.navigate(["viaje/" + id])
  }

  updateTripNoRouting(trip: Trip, id: string) {
    const tripDocRef = doc(this.db, 'trips/'+id);
    setDoc(tripDocRef,trip);
  }
}
