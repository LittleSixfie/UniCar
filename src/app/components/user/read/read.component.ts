import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { ShowViajeService } from 'src/app/services/show-viaje-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserTripsService } from 'src/app/services/user-trips.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  id: string
  userData?: User;
  userCreatedTrips?:Map<string,string>;
  userRequestedTrips?:Map<string,string>;

  //userData = user desde auth
  constructor(private crudUserService: CrudUserService, private showViajeService: ShowViajeService, private userTripsService:UserTripsService, private router: ActivatedRoute) { // conseguir el email o id atraves del auth como parámetro
    this.userData = new User();
    this.id = this.router.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.read();
  }

  public read(): void {
    const datos = this.crudUserService.read(this.id);
    datos.then((data) => {
      if(data != undefined) {
        this.userData = data;
        this.getCreatedTrips();
        this.getRequestedTrips();
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Se ha producido un error al recuperar los datos");
    })
  }

  private getCreatedTrips(): void {
    this.userCreatedTrips = this.userTripsService.getTripsForUser(this.id, 0);
  }

  private getRequestedTrips(): void {
    this.userRequestedTrips = this.userTripsService.getTripsForUser(this.id, 1);
  }

}
