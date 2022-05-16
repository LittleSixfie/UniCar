import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { collection, query } from 'firebase/firestore';
import { combineLatest, map } from 'rxjs';
import { HomePageComponent } from '../home-page/home-page.component';
import { Trip } from '../models/trips.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-viaje',
  templateUrl: './search-viaje.component.html',
  styleUrls: ['./search-viaje.component.css']
})
export class SearchViajeComponent implements OnInit {

  trips: Trip[] = []
  isSearchEmpty: boolean | undefined
  date: string | null = ""
  dateLarge = new Date();
  aux: string = ""
  ruta: string[] = []
  origin: string = ""
  destiny: string = ""
  numberOfPassengers: number = 0
  
 
  constructor(private afsCompact: AngularFirestore, private search: SearchService,private router :ActivatedRoute,private auxrouter: Router
    ,public datepipe: DatePipe) { 
      
      this.aux = this.router.snapshot.params['id']
      this.ruta = this.aux.split(";")
      this.date = this.datepipe.transform(this.ruta[2],'d/MM/yyyy')
      this.origin = this.ruta[0]
      this.destiny = this.ruta[1]
      this.numberOfPassengers = Number(this.ruta[3])
      //const viajes = this.search.search('Telde','Tafira',3,'23/04/2022')
      
      const viajes = this.search.search(this.origin,this.destiny,this.numberOfPassengers,this.date)
      viajes.then((response) => {
        this.trips = response;
      })
      
    
  }
  public home(){
    this.auxrouter.navigate(['/home'])
  }

  public showViaje(id: any){
    this.auxrouter.navigate(['/viaje/'+id])
  }

  onSearchTrip() {
    this.trips = [];
    this.date = this.datepipe.transform(this.dateLarge,'d/MM/yyyy')
    const viajes = this.search.search(this.origin,this.destiny,this.numberOfPassengers,this.date)
    
    viajes.then((response) => {
      this.trips = response;
    })
    
    
    
    /*
    this.trips = [];
    const $name = this.afsCompact
      .collection('trips', (ref) =>
        ref.where('nameDriver','==', this.searchParams.name)
        
        
      )
      .valueChanges({ idField: 'id' });

      const $origin = this.afsCompact
      .collection('trips', (ref) =>
        ref.where('origin','==', this.searchParams.origin)
      
      )

      .valueChanges({ idField: 'id' });

      const $destination = this.afsCompact
      .collection('trips', (rf) =>
        rf.where('destination','==', this.searchParams.destination)
      
      )
      .valueChanges({ idField: 'id' });

      combineLatest([$name, $origin, $destination])
        .pipe(map(([one,two,three]) => [...one,...two,...three]))
        .subscribe((response: any) => {
          this.trips = response;
          if(response.length > 0 ){
            console.log(response.length);
          }else{
            this.isSearchEmpty = true;
          }
        });
        */
  }

  ngOnInit(): void {
  }

}
