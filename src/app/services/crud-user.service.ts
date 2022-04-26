import { Injectable } from '@angular/core';
import { Firestore, collection, where, query, getDocs } from '@angular/fire/firestore';
import { User } from '../models/user';
import { doc, getDoc } from 'firebase/firestore';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudUserService {

  db!: Firestore;
  userRef;
  dbPath: string = "users";
  userData!: User;
  // Converter para escribir en la base de datos o leer
  userConverter = {
    toFirestore: (u: User) => {
      return {        
        userName : u.userName,
        userEmail : u.userEmail,
        userAge : u.userAge,
        userPassword : u.userPassword,
        userDriver : u.userDriver,
        userDriverLicense : u.userDriverLicense,
        driverPoints : u.driverPoints,
        userPic : u.userPic,
        userTlf : u.userTlf,
        passengerPoints : u.passengerPoints,
        requestedTrips : u.requestedTrips,
        createdTrips : u.createdTrips,
        favTrips : u.favTrips,
      };
    },
    fromFirestore: (snapshot: any, options: any) => {
      const data = snapshot.data(options);
      let user: User = new User();
      user.userName = data.userName;
      user.userEmail = data.userEmail;
      user.userAge = data.userAge;
      user.userPassword = data.userPassword;
      user.userDriver = data.userDriver;
      user.userDriverLicense = data.userDriverLicense;
      user.driverPoints = data.driverPoints;
      user.userPic = data.userPic;
      user.userTlf = data.userTlf;
      user.passengerPoints = data.passengerPoints;
      user.requestedTrips = data.requestedTrips;
      user.createdTrips = data.createdTrips;
      user.favTrips = data.favTrips;
      return user;
    }
  };

  constructor(db: Firestore) {
    this.db = db;
    this.userRef = collection(this.db, this.dbPath).withConverter(this.userConverter);
  }

  public create(user: User): Boolean{
    return true;
  }

  public async read(email: string): Promise<User>{         
    var q = query(this.userRef, where("userEmail", "==", email));
    var querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.userData = doc.data();
      console.log(doc.id, " ==> ", this.userData);
      //let favT = this.getFavTrips(a.favTrips);      
    });
    return this.userData;
  }

  public update(email: String, user: User): Boolean{
    return true;
  }

  public delete(email: String): Boolean{
    return true;
  }

}
