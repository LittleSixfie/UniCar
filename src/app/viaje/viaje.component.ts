import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import {MatDialog} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {

  public inputControl: FormControl = new FormControl();

  constructor() { }

  ngOnInit(): void {
    this.inputControl = new FormControl();
    
  }

  

  value=""
  clearValue() {
   this.value="";
  }



}
