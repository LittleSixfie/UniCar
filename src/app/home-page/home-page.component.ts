import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public openSesion(){
    this.router.navigate(['/userCreate'])
  }

  public openTrips(){
    this.router.navigate(['/createViaje'])
  }

  

}
