import { Injectable } from '@angular/core';
import { Firestore, collection, where, query, getDocs } from '@angular/fire/firestore';
import { User } from '../models/user';
import { addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { Data, Router } from '@angular/router';
import { CrudUserService } from './crud-user.service';
import { create } from 'domain';
import { ShowViajeService } from './show-viaje-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserTripsService {

  db!: Firestore;
  dbPath: string = "users";
  userData!: User;
  viajesCreados?: string[];
  createdTrips: any;

  constructor(db: Firestore, private crudUserService: CrudUserService, private showViajeService: ShowViajeService) {
    this.db = db;
  }

  public async getCreatedTripsForUser(id: string): Promise<string[]> {
    const data = this.crudUserService.read(id);
    await data.then((datos) => {
      if (datos != undefined) {
        this.userData = datos;
        this.createdTrips = datos.createdTrips;
      }
    })
    
    if (this.createdTrips != undefined) {
      console.log("hola");
      let a = JSON.stringify(this.createdTrips);
      console.log(a);
      var userCreatedTrips = Object.keys(JSON.parse(a));
      userCreatedTrips.forEach( async (trip) => {
        if (trip != undefined) {
          await this.showViajeService.read(trip).then((response) => {
            if (response.data() != undefined) {
              return this.viajesCreados?.push(response.data().origen + " - " + response.data().destino);
            } else {
              return [];
            }
          });
        }
      })
    }
  
    return [];
  }
}
