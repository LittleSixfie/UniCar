import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user: User = new User();
  submitted = false;
  hide = true;
  auth = getAuth()

  constructor(private crudUserService: CrudUserService) {}

  ngOnInit(): void {}

  saveUser(): void {
    if(this.registerUser()){
      this.crudUserService.create(this.user)
    }
  }

  private registerUser(): boolean {
    /*createUserWithEmailAndPassword(this.auth, this.user.userEmail, this.user.userPassword)
    .then((userCredentials) => {
    
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });*/
    return true;
  }

  public searchFile() {
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/jpg'
    input.onchange = (e) => {
      if((<HTMLInputElement>e.target).files != null){
        var file = (<HTMLInputElement>e.target).files?.[0];
        this.user.userDriverLicense = file?.
      }

    }
    console.log(this.user.userDriverLicense);
    input.click()
  }

}
