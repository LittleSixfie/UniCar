import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { ShowViajeService } from 'src/app/services/show-viaje-service.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  email: string
  userData?: User;
  userCreatedTrips?:string[];
  userRequestedTrips?:string[];

  //userData = user desde auth
  constructor(private crudUserService: CrudUserService, private showViajeService: ShowViajeService) { // email: String as a parameter
    this.userData = new User();
    this.email = "antonio@gmail.com";
  }

  ngOnInit(): void {
    this.read();
  }

  public read(): void {
    const datos = this.crudUserService.read(this.email);
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

  private getRequestedTrips(): void {
    let a = JSON.stringify(this.userData?.requestedTrips);
    this.userRequestedTrips = Object.keys(JSON.parse(a));
    console.log(this.userRequestedTrips);
  }

  private getCreatedTrips(): void {
    // Obtiene id de los trips
    let a = JSON.stringify(this.userData?.createdTrips);
    this.userCreatedTrips = Object.keys(JSON.parse(a));
    console.log(this.userCreatedTrips);

    // Obtiene información de los trips y towns
    /* b.forEach((trip) => {
      this.showViajeService.read(trip).then((response) => {
        if(response.data() != undefined) {
          let or = response.data().origin;
          let or1 = JSON.stringify(or);
          let or2 = Object.keys(JSON.parse(or1));
          console.log(or2);
          //console.log(response.data().origin);
        }
      })
    }) */

  }
}
