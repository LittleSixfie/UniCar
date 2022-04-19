import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public inputControl: FormControl = new FormControl();

  user: User = new User();
  constructor( private crudUser : CrudUserService) { }

  ngOnInit(): void {
    this.inputControl = new FormControl();
  }



  usernameNotNull(username:string){
    return username.length!=0;
  }
}
