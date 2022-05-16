import { Component, OnInit } from '@angular/core';
import { ShowViajeService } from '../services/show-viaje.service';
import { Trip } from '../models/trips.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { CrudUserService } from '../services/crud-user.service';
import { getAuth } from 'firebase/auth';
import { UpdateViajeServiceService} from '../services/update-viaje-service.service'
@Component({
  selector: 'app-show-viaje',
  templateUrl: './show-viaje.component.html',
  styleUrls: ['./show-viaje.component.css'],
})
export class ShowViajeComponent implements OnInit {
  viaje:Trip ={
    id:"",
    nameDriver:"noExist",
    date:"",
    origin:"",
    destination:"",
    hour:"",
    model_car:"",
    brand_car:"",
    colour_car:"",
    seats:0,
    price:0,
    passenger:[]
  }
  rate = 2.5;
  asientosLibres:number =0;

  constructor(private showViaje: ShowViajeService, private router :ActivatedRoute, private auxRouter: Router, private home: AppComponent,  private crudUserService: CrudUserService, private updateViajeService: UpdateViajeServiceService) {
    const viajes =  this.showViaje.read(this.router.snapshot.params['id'])
    viajes.then((response) => {
      if (response.data() == undefined) {
        console.log('Not Found')
        return undefined;
      }
      this.viaje= response.data();
      this.asientosLibres = response.data().seats - response.data().passenger.length
      return true;
    })
    .catch((err) => {
      console.log(err)
      alert(err.message);
    })

  }

  update():void{
    this.auxRouter.navigate(["modificarViaje/"+this.router.snapshot.params['id']]);
  }

  unirse():void {
    if(this.asientosLibres > 0 ){
      this.crudUserService.addToTrip(this.router.snapshot.params['id'], 'requestedTrips');
      let aut = getAuth();
      if (aut.currentUser != null) {
        const u = this.crudUserService.read(aut.currentUser.uid);
        u.then((user) => {
          if(user != undefined) {
            this.viaje.passenger?.push(user.userName != undefined ? user.userName : "");
            this.updateViajeService.updateTripNoRouting(this.viaje, this.router.snapshot.params['id']);
          }
        })
        this.auxRouter.navigate(["miCuenta/" + aut.currentUser.uid]);
      }
      // Añadir pasajero al viaje y añadir la ruta al perfil
    } else {
      alert("No hay espacio")
    }
  }

  managePassenger():void{
    this.auxRouter.navigate(["managePassenger/"+this.router.snapshot.params['id']]);
  }
  ngOnInit(): void {};

  userLogged(): boolean{
    if(this.home.getUserName() == ""){
      return false
    }
    return true
  }

  userLoggedOwns(): boolean{
    if(this.home.getUserName() == ""){
      return false
    } else if(this.home.getUserName() == this.viaje.nameDriver){
      return true
    } else {
      return false
    }
  }
}
