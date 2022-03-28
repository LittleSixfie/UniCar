import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Trip } from '../models/trips.model'
import { ViajeService } from '../services/viaje.service';
@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {

  public inputControl: FormControl = new FormControl();

  trip: Trip = new Trip();
  submitted = false;

  constructor(private viajeService: ViajeService) { }

  ngOnInit(): void {
    this.inputControl = new FormControl();
    
  }

  saveTrip(): void{
    this.viajeService.create(this.trip).then(() =>{
      console.log('Usuario guardado');
      this.submitted = true;
    });
  }

  newTrip(): void {
    this.submitted = false;
    this.trip = new Trip;
  }

  

  value=""
  clearValue() {
   this.value="";
  }



}
