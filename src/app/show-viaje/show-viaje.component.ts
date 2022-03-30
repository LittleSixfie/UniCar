import { Component, OnInit } from '@angular/core';
import { ShowViajeService } from '../services/show-viaje.service';
import { Trips } from '../trips.model';

@Component({
  selector: 'app-show-viaje',
  templateUrl: './show-viaje.component.html',
  styleUrls: ['./show-viaje.component.css'],
})
export class ShowViajeComponent implements OnInit {
  viaje = {
    car: {
      brand: '',
      color: '',
      model: '',
    },
    nameDriver: '',
    passenger: {
      driver: '',
    },
    date: '',
    origin: '',
    destiny: '',
    hour: '',
    seats: 0,
    price: 0,
    distance: 0,
  };
  rate = 2.5;
  constructor(private showViaje: ShowViajeService) {
   
  }

  unirse(): void {
    const viajes = this.showViaje.read('trip01');
    this.viaje = viajes;
    console.log(this.viaje);
  }
  ngOnInit(): void {};
}
