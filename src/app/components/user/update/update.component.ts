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
import { UserTripsService } from 'src/app/services/user-trips.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: string;
  user: User;
  userCreatedTrips?: string[];
  userRequestedTrips?: string[];

  constructor(private crudUserService: CrudUserService, private showViajeService: ShowViajeService, private userTripsService: UserTripsService, private router: ActivatedRoute) {
    this.user = new User();
    this.id = this.router.snapshot.params['id'];
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public inputControl: FormControl = new FormControl();

  public getCreatedTrips(){    
    this.userCreatedTrips = this.userTripsService.getCreatedTripsForUser(this.id); 
  }

  ngOnInit(): void {
    this.inputControl = new FormControl();
  }

  onUpdate() {
    if (this.user != undefined) this.crudUserService.update(this.router.snapshot.params['id'], this.user);
  }

  public update(): void {
    if (this.user != undefined) this.crudUserService.update(this.id, this.user);
  }

}
