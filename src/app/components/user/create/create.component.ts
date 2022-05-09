import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { Router } from '@angular/router';
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { AuthService } from 'src/app/services/auth.service';


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
  uid;
  auth;
  storage = getStorage();

  constructor(private crudUserService: CrudUserService, private router:Router, private AuthService: AuthService) {
    this.uid = this.AuthService.getCurrentUser();
    this.auth = this.AuthService.getAuth();
  }

  ngOnInit(): void {}

  saveUser(): void {
    if(this.registerUser()){
      //this.uploadPictures()
      //this.crudUserService.create(this.user)
      this.router.navigate(["/perfil/" + this.uid]);
    }
  }

  private registerUser(): boolean {
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
