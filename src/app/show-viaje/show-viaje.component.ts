import { Component, OnInit } from '@angular/core';
import {ShowViajeService} from '../services/show-viaje.service'

@Component({
  selector: 'app-show-viaje',
  templateUrl: './show-viaje.component.html',
  styleUrls: ['./show-viaje.component.css'],
})
export class ShowViajeComponent implements OnInit {
  currentRate = 2;
  origen = '';
  destino = '';
  horaIda = '';
  horaVuelta = '';
  user = '';
  coche = '';
  color = '';

  constructor(private showViaje: ShowViajeService){}
  unirse():void{
    this.showViaje.readAll();
  }
  ngOnInit(): void {}
}
