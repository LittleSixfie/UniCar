import { Component, OnInit } from '@angular/core';
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

  constructor(private crudUserService: CrudUserService) {}

  ngOnInit(): void {}

  saveUser(): void {
    this.crudUserService.create(this.user)
  }

  newUser(): void {
    this.submitted = false;
    this.user = new User;
  }

}
