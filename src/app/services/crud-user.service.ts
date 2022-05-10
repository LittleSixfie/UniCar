import { Injectable } from '@angular/core';
import { Firestore, collection, where, query, getDocs } from '@angular/fire/firestore';
import { User } from '../models/user';
import { addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { Data, Router } from '@angular/router';

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
  }

  public async create(user: User): Promise<Boolean>{
    console.log(user.id)
    const res = doc(this.db, 'users/'+user.id)
    const id=setDoc(res, JSON.parse(JSON.stringify(user)));
    let aux: string ="";
   /* await id.then(function(data){
      aux=data.id
      return data.id
    });*/

    /*user.id = aux
    this.update(aux, JSON.parse(JSON.stringify(user)))
    this.router.navigate(["userRead/" + aux])*/
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
    setDoc(userDocRef, user)
    this.router.navigate(["userRead/" + id])
    return true;
  }

  public delete(email: String): Boolean{
    return true;
  }


  /*public async getUserByMail(user: User): Promise<User> {
    const col = collection(this.db, this.dbPath);
    console.log(user)
    const q = query(col, where("userEmail", "==", user.userEmail));
    
    const querySnapshot = await getDocs(q);
    var user = new User();
    
    querySnapshot.forEach((doc) => {
      console.log(user)
        user = doc.data();
    });
    return user;
  }*/
}
