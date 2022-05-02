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

  constructor(db: Firestore, private crudUserService: CrudUserService, private showViajeService: ShowViajeService) {
    this.db = db;
  }

  public getCreatedTripsForUser(id: string): string[] {
    const data = this.crudUserService.read(id);
    data.then((datos) => {
      if (datos != undefined) {
        this.userData = datos;
      }
    })
    if (this.userData.createdTrips != undefined) {
      let a = JSON.stringify(this.userData.createdTrips);
      console.log(a);
      var userCreatedTrips = Object.keys(JSON.parse(a));
      userCreatedTrips.forEach((trip) => {
        if (trip != undefined) {
          const viaje = this.showViajeService.read(trip).then((response) => {
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
