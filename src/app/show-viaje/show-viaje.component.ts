import { Component, OnInit } from '@angular/core';
import { ShowViajeService } from '../services/show-viaje-service.service';
import { Trips } from '../trips.model';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-show-viaje',
  templateUrl: './show-viaje.component.html',
  styleUrls: ['./show-viaje.component.css'],
})
export class ShowViajeComponent implements OnInit {
  viaje:Trips ={
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
  }
  rate = 2.5;
  tripID!: string | null;
  constructor(private route: ActivatedRoute, private showViaje: ShowViajeService) {
    
  }

  unirse():void {
    if(this.tripID != null) {
      const viajes =  this.showViaje.read(this.tripID);
      //const viajes =  this.showViaje.read('fQOrRsXaAxgPbNppqKf9');
      viajes.then((response) => {
      console.log(response.data());
      if (response.data() == undefined) {
        console.log('Not Found')
        return undefined;
      }
      this.viaje= response.data();
      return true;
      })
      .catch((err) => {
        console.log(err)
        alert(err.message);
      })
    }
  }

  ngOnInit(): void {
    this.tripID = this.route.snapshot.paramMap.get('id');
  };
}