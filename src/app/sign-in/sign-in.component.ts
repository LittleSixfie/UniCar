import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { CRUDSesionService } from '../services/crud-sesion.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {
  user: User = new User();
  submitted = false;

  constructor(private crudSesionService: CRUDSesionService) {}

  ngOnInit(): void {}

  saveUser(): void {
    this.crudSesionService.create(this.user).then(() =>{
      console.log('Usuario guardado');
      this.submitted = true;
    });
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User;
  }

}
