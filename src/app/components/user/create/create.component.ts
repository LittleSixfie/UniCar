import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, Auth, User as UserAuth } from '@firebase/auth';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { Router } from '@angular/router';
import { getStorage, ref, uploadBytes } from 'firebase/storage'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user: User = new User();
  submitted = false;
  hide = true;
  License?: File;
  Picture?: File;
  auth: Auth = getAuth();
  userID: string = "";
  storage = getStorage();

  constructor(private crudUserService: CrudUserService, private router:Router) {
    //this.auth = getAuth();
    //this.userAuth = this.auth.currentUser;
  }

  ngOnInit(): void {}

  async saveUser(): Promise<void> {
    //this.auth = getAuth();
    const registrado = await this.registerUser();
    console.log("Registrado promise: ", registrado);
    //this.userAuth = this.auth.currentUser;
    if(registrado){
      //this.uploadPictures()
      //this.crudUserService.create(this.user)
      console.log("This.userID: ", this.userID);
      if(this.userID !== "") this.router.navigate(["/perfil/" + this.userID]);
    }
  }

  private async registerUser(): Promise<Boolean> {
    this.auth = getAuth();
    const promise = new Promise<Boolean>((resolve, reject) => {
      createUserWithEmailAndPassword(this.auth, this.user.userEmail, this.user.userPassword)
      .then(async (userCredentials) => {
        console.log("Registrandome, uid: ", userCredentials.user.uid);
        this.userID = userCredentials.user.uid;
        console.log("this.userID en registerUser(): ", this.userID)
        this.uploadPictures()
        //this.router.navigate(["/perfil/" + userCredentials.user.uid]);
        await this.crudUserService.create(this.user);
        resolve(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(false);
      });
    });
    return promise;
  }

  public searchLicense() {
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/jpg'
    input.onchange = (e) => {
      if((<HTMLInputElement>e.target).files != null){
        this.License = (<HTMLInputElement>e.target).files?.[0];
        this.user.userDriverLicense = this.License?.name
      }

    }
    console.log(this.user.userDriverLicense);
    input.click()
  }

  public searchPicture(){
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/jpg'
    input.onchange = (e) => {
      if((<HTMLInputElement>e.target).files != null){
        this.Picture = (<HTMLInputElement>e.target).files?.[0];
        this.user.userPic = this.Picture?.name
      }

    }
    console.log(this.user.userDriverLicense);
    input.click()
  }

  private uploadPictures(){
    if(this.License !=  undefined){
      const licenseRef = ref(this.storage, `${this.user.userEmail}/License/${this.user.userDriverLicense}`)
      uploadBytes(licenseRef, this.License)
    }
    if(this.Picture != undefined){
      const pictureRef = ref(this.storage, `${this.user.userEmail}/Picture/${this.user.userPic}`)
      uploadBytes(pictureRef, this.Picture)
    }
    this.License = undefined;
    this.Picture = undefined;
  }

}
