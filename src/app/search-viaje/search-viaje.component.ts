import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map } from 'rxjs';
import { Trip } from '../models/trips.model';

@Component({
  selector: 'app-search-viaje',
  templateUrl: './search-viaje.component.html',
  styleUrls: ['./search-viaje.component.css']
})
export class SearchViajeComponent implements OnInit {

  trips: Trip[] = [];
  isSearchEmpty: boolean | undefined;
  searchParams = {
    name: null,
    origin: null,
    destination: null,
  };
 
  constructor(private afsCompact: AngularFirestore) { }

  onSearchTrip() {
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
      .collection('trips', (ref) =>
        ref.where('destination','==', this.searchParams.destination)
      
      )
      .valueChanges({ idField: 'id' });

      combineLatest([$name, $origin, $origin])
        .pipe(map(([one,two,three]) => [...one, ...two, ...three]))
        .subscribe((response: any) => {
          this.trips = response;
          if(response.length > 0 ){

          }else{
            this.isSearchEmpty = true;
          }
        });
  }

  ngOnInit(): void {
  }

}
