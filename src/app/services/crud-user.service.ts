import { Injectable } from '@angular/core';
import { Firestore, collection, where, query, getDocs } from '@angular/fire/firestore';
import { User } from '../models/user';
import { addDoc, doc, DocumentReference, FieldPath, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Data, Router } from '@angular/router';
import { Auth, getAuth, onAuthStateChanged, User as UserAuth } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class CrudUserService {

  db!: Firestore;
  userRef;
  dbPath: string = "users";
  userData!: User;
  auth: Auth | null = null;
  user: UserAuth | null = null;

  // Converter para escribir en la base de datos o leer
  userConverter = {
    toFirestore: (u: User) => {
      return {
        id : u.id,
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

      user.id = data.id;
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

  constructor(db: Firestore, private router:Router) {
    this.db = db;
    this.userRef = collection(this.db, this.dbPath).withConverter(this.userConverter);

    // No entra aquí, el getAuth() puede que no llegue a tiempo o que está creando una instacia nueva y por eso user es null
  }

  public async create(user: User): Promise<Boolean>{
    this.auth = getAuth();
    this.user = this.auth.currentUser;
    console.log("usuario: ", "=>", this.user);
    const res = collection(this.db, 'users')
    //console.log(JSON.parse(JSON.stringify(user)));
    const uData =  JSON.parse(JSON.stringify(user));
    //const id=addDoc(res, JSON.parse(JSON.stringify(user)));
    //console.log("this.user: ", this.user);
    if(this.user !== null) {
      const id = await setDoc(doc(this.db, 'users', this.user.uid), uData);
      console.log("setDoc: ", id);
    }

/*       let aux: string ="";
      await id.then(function(data){
        aux=data.id;
        return data.id;
        user.id = aux
      }); */
      //this.update(aux, user);
      //this.update(this.user.uid, user);
      //this.router.navigate(["userRead/" + aux])
      //this.router.navigate(["perfil/" + this.user.uid]);
    return true;

  }

  public async read(id: string): Promise<User>{
    // Cambiado para que lea por id
    const docRef = doc(this.db, this.dbPath, id).withConverter(this.userConverter);
    const idDoc = await getDoc(docRef);
    if(idDoc.exists()) {
      return idDoc.data();
    } else {
      return new User();
    }
  }

  public update(id: string, user: User): Boolean{
    const userDocRef = doc(this.db, 'users/'+id);
    //No funciona porque haceis una movida turboloca ~6d2
    const userString = JSON.parse(JSON.stringify(user));
    setDoc(userDocRef, userString);
    this.router.navigate(["userRead/" + id])
    return true;
  }

  public delete(email: String): Boolean{
    return true;
  }

  public async addToTrip(trip_id: string, typeOfTrip: string): Promise<any> {
    this.auth = getAuth();
    this.user = this.auth.currentUser;
    if(this.user !== null) {
      const uid = this.user.uid;
      const userRef = doc(this.db, 'users', uid);
      const tripRef = doc(this.db, 'trips', trip_id);
      //const tripPath = new FieldPath('trips',trip_id);
      //console.log("tripRef: ", JSON.stringify(tripPath));
      //const data = JSON.parse(JSON.stringify('{' + typeOfTrip + ': {' + trip_id + ': ' + tripPath + '}}'));
      const data = JSON.parse(JSON.stringify('{' + typeOfTrip + ': {' + trip_id + ': }}'));
      
      console.log(data);


      const data2 = {
        typeOfTrip: {
          trip_id : tripRef,
        }
      }
      
      console.log("data parseada: ", data2);
      await updateDoc(userRef, data);
    } else {
      console.log("Tienes que estar conectado para añadirte a un viaje");
    }

  }
}
