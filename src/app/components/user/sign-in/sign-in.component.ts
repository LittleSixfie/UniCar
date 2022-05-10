import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { CrudUserService } from 'src/app/services/crud-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  hide: boolean = true;
  user: User = new User();
  auth = getAuth();

  constructor(private crudUserService: CrudUserService, private router:Router) { }

  ngOnInit(): void {
  }

  public signIn(){
    
    if(this.user.userEmail == undefined || this.user.userPassword == undefined) return false
    signInWithEmailAndPassword(this.auth, this.user.userEmail, this.user.userPassword)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    })
    console.log(this.user)
    var a = this.crudUserService.getUserByMail(this.user!)
    return;
  }
}
