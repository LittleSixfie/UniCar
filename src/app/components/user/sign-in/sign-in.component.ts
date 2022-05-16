import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth'
import { CrudUserService } from 'src/app/services/crud-user.service';
import { Router } from '@angular/router';

import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide: boolean = true;
  user: User = new User();
  auth = getAuth();

  constructor(private crudUserService: CrudUserService, private router:Router, private home:AppComponent) { }

  ngOnInit(): void {
  }

  public signIn(){
    
    if(this.user.userEmail == undefined || this.user.userPassword == undefined){
      alert("Por favor introduzca un usuario y contraseña");
      return false
    } 
    signInWithEmailAndPassword(this.auth, this.user.userEmail, this.user.userPassword).then(async () => {
      if(this.auth.currentUser?.uid != undefined){
        this.user = await this.crudUserService.read(this.auth.currentUser?.uid)
        this.home.setUser(this.auth.currentUser!.uid, this.user.userName as string)
      } else {
        console.log('Ta roto')
      }
      this.router.navigate(["home"])
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("No se ha podido determinar que las credenciales proporcionadas sean auténticas.")
    })
    return;
  }
}
