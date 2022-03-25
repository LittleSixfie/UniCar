import { Component, OnInit } from '@angular/core';

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

  
  unirse():void{
    
  }
  ngOnInit(): void {}
}
