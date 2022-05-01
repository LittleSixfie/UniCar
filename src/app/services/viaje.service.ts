import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Trip } from '../models/trips.model'
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Observable, throwIfEmpty } from 'rxjs';
import { collectionData } from 'rxfire/firestore';
import { Router } from '@angular/router';
import { UpdateViajeServiceService } from './update-viaje-service.service';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  db : Firestore;
  

  constructor(db: Firestore, private router:Router, private update:UpdateViajeServiceService) {
    this.db = db;
  }

   public async create(trip: Trip): Promise<string>{
     trip.passenger = []
     trip.id = "0"
    const res = collection(this.db, "trips")
    const id = addDoc(res, JSON.parse(JSON.stringify(trip)));
    let aux: string =""; 
    const id2 = collectionData(res,{idField: 'id'}) as 
    Observable<Trip>;
    
    await id.then(function(data){
      aux=data.id
      return data.id
    });
    let viajeParaAcutlizar:Trip = {
      id:aux,
      nameDriver:trip.nameDriver,
      date:trip.date,
      origin:trip.origin,
      destination:trip.destination,
      hour:trip.hour,
      model_car:trip.model_car,
      brand_car:trip.brand_car,
      colour_car:trip.colour_car,
      seats:trip.seats,
      price:trip.price,
      passenger:trip.passenger
    }
    this.update.updateTrip(viajeParaAcutlizar , aux)

    this.router.navigate(["viaje/" + aux])
    return aux;
  }
}
