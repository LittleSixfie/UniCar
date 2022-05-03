import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query } from 'firebase/firestore';
import { combineLatest, map } from 'rxjs';
import { Trip } from '../models/trips.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-viaje',
  templateUrl: './search-viaje.component.html',
  styleUrls: ['./search-viaje.component.css']
})
export class SearchViajeComponent implements OnInit {

  trips: Trip[] = [];
  isSearchEmpty: boolean | undefined;
  searchParams = {
    name: "",
    origin: "",
    destination: "",
  };
 
  constructor(private afsCompact: AngularFirestore, private search: SearchService) { 
    
    
  }

  onSearchTrip() {

    const viajes = this.search.search(this.searchParams.name,this.searchParams.origin,this.searchParams.destination)
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
