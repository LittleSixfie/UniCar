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

  constructor(db: Firestore, private router:Router) {
    this.db = db;
    this.userRef = collection(this.db, this.dbPath).withConverter(this.userConverter);
  }

  public async create(user: User): Promise<Boolean>{
    const res = collection(this.db, 'users')
    const id=addDoc(res, JSON.parse(JSON.stringify(user)));
    let aux: string =""; 
    await id.then(function(data){
      aux=data.id
      return data.id
    });
    
    user.id = aux
    //FALTA EL UPDATE ~6d2
    //this.update(aux, user) ~6d2
    this.router.navigate(["userRead/" + aux])
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

  public update(id: string, user: User): Boolean{
    const userDocRef = doc(this.db, 'user/'+id);
    //No funciona porque haceis una movida turboloca ~6d2
    setDoc(userDocRef, user)
    this.router.navigate(["userRead/" + id])
    return true;
  }

  public delete(email: String): Boolean{
    return true;
  }

}
