import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Trip } from 'src/app/models/trips.model';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { DocumentReference } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public inputControl: FormControl = new FormControl();

  user: User = new User();
  constructor( private crudUser : CrudUserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.inputControl = new FormControl();
  }

  updateTrip(){
    this.router.navigate(['/updateTrip'])
  }

  onUpdate(){
    this.crudUser.update(this.activatedRoute.snapshot.params['id'], this.user);
  }


  usernameNotNull(username:string){
    return username.length!=0;
  }
}
