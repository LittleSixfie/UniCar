import { Component, OnInit } from '@angular/core';
import { ShowViajeService } from '../services/show-viaje.service';
import { Trip } from '../models/trips.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudUserService } from '../services/crud-user.service';
@Component({
  selector: 'app-show-viaje',
  templateUrl: './show-viaje.component.html',
  styleUrls: ['./show-viaje.component.css'],
})
export class ShowViajeComponent implements OnInit {
  viaje:Trip ={
    id:"",
    nameDriver:"",
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

  constructor(private showViaje: ShowViajeService, private router :ActivatedRoute, private auxRouter: Router, private crudUserService: CrudUserService ) {
    const viajes =  this.showViaje.read(this.router.snapshot.params['id'])
    viajes.then((response) => {
      console.log(response.data());
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
    this.auxRouter.navigate(["updateViaje/"+this.router.snapshot.params['id']]);
  }

  unirse():void {
    if(this.asientosLibres > 0 ){
      this.crudUserService.addToTrip(this.router.snapshot.params['id'], 'requestedTrips');
    } else {
      alert("No hay espacio")
    }
  }
  ngOnInit(): void {};
}
