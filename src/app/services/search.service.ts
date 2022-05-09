import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, DocumentData, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';
import { Trip } from '../models/trips.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  trips: Trip[] = [];
  db : Firestore;
  constructor(db: Firestore) { 
    this.db = db;
  }

  async search(origin: string, destination: string,numberOfPassengers: number, date: string | null): Promise<Trip[]>{
    //const q = query(collection(this.db,"trips"),where("origin","==",origin),where("destination","==",destination),
                     // where("seats","==",numberOfPassengers),where("date","==",date))
    
    const q = query(collection(this.db,"trips"),where("origin", "==", origin),where("destination","==",destination),
                    where("date","==",date))                 
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.trips.push(doc.data() as Trip)
      
    });
    return this.trips
  }
}

