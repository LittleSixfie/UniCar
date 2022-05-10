import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}

  public origin =""
  public destiny =""
  date = new Date();
  numberOfPassengers = 1;

  ngOnInit(): void {}

  public openSesion() {
    this.router.navigate(['/registrarse']);
  }

  public openTrips() {
    this.router.navigate(['/crearViaje']);
  }

  search() {
    this.router.navigate([
      '/search/' +
        this.origin +
        ';' +
        this.destiny +
        ';' +
        this.date +
        ';' +
        this.numberOfPassengers,
    ]);
  }

  search(){
    this.router.navigate(['/search/'+this.origin +
    ';' +
    this.destiny +
    ';' +
    this.date +
    ';' +
    this.numberOfPassengers,])
    //this.router.navigate(['/createViaje'])
  }  

}
