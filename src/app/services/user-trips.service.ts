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

  constructor(db: Firestore, private crudUserService: CrudUserService, private showViajeService: ShowViajeService) {
    this.db = db;
  }

  // created_or_fav => Variable para buscar los viajes creados o los favoritos, vale 0 o 1 respectivamente
  public getTripsForUser(id: string, created_or_fav_or_requested: number): Map<string, string> {
    var viajesCreados: Map<string, string> = new Map<string, string>();
    const data = this.crudUserService.read(id);
    data.then((datos) => {
      if (datos != undefined) {
        this.userData = datos;
      }
    });
    data.then(() => {
      if (this.userData != undefined) {
        if(created_or_fav_or_requested == 0) {
          var a = JSON.stringify(this.userData.createdTrips);
        } else if(created_or_fav_or_requested == 1){
          var a = JSON.stringify(this.userData.requestedTrips);
        } else {
          var a = JSON.stringify(this.userData.favTrips);
        }
        console.log(a, "hola")
        var userCreatedTrips = Object.keys(JSON.parse(a));
        userCreatedTrips.forEach((trip) => {
          if (trip != undefined) {
            const viaje = this.showViajeService.read(trip).then((response) => {
              if (response.data() != undefined) {
                viajesCreados.set(response.id, response.data().origin + " - " + response.data().destination);
              }
            });
          }
        })
      }
      return viajesCreados;
    })
    .catch((err) => {
      console.log("Hubo un error inesperado: ", err);
    });
    return viajesCreados;
  }
}
