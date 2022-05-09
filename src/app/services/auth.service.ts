import { Injectable } from '@angular/core';
import { Auth, getAuth, createUserWithEmailAndPassword } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  getCurrentUser() {
    return getAuth().currentUser?.uid;
  }

  getAuth() {
    return getAuth();
  }

/*   createUser(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, this.user.userEmail, this.user.userPassword)
    .then((userCredentials) => {
      this.uploadPictures()
      //this.router.navigate(["/perfil/" + userCredentials.user.uid]);
      return this.crudUserService.create(this.user, userCredentials.user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
    return true;
  } */
}
