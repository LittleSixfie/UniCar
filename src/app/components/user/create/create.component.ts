import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user: User = new User();
  submitted = false;
  hide = true;

  constructor(private crudUserService: CrudUserService, private router:Router) {}

  ngOnInit(): void {}

  saveUser(): void {
    this.crudUserService.create(this.user)
    this.router.navigate(["userRead/1"]);
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User;
  }

}
