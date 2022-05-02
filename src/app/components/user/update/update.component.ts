import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Trip } from 'src/app/models/trips.model';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { ShowViajeService } from 'src/app/services/show-viaje-service.service';
import { DocumentReference } from 'firebase/firestore';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadComponent } from '../read/read.component';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: string;
  userData?: User;
  userCreatedTrips?: string[];
  userRequestedTrips?: string[];
  readComponent: ReadComponent;

  constructor(private crudUserService: CrudUserService, private showViajeService: ShowViajeService, private router: ActivatedRoute) {
    this.userData = new User();
    this.id = this.router.snapshot.params['id'];
    this.readComponent = new ReadComponent(crudUserService, showViajeService, router);
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public inputControl: FormControl = new FormControl();

  user: User = new User();

  ngOnInit(): void {
    this.inputControl = new FormControl();
  }

  onUpdate() {
    this.crudUserService.update(this.router.snapshot.params['id'], this.user);
  }

  public update(): void {
    if (this.userData != undefined) this.crudUserService.update(this.id, this.userData);
  }

}
