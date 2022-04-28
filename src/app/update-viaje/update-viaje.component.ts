import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowViajeService } from '../services/show-viaje.service';
import { UpdateViajeServiceService } from '../services/update-viaje-service.service';
import { Trip } from '../models/trips.model';

@Component({
  selector: 'app-update-viaje',
  templateUrl: './update-viaje.component.html',
  styleUrls: ['./update-viaje.component.css']
})
export class UpdateViajeComponent implements OnInit {
  
  viaje:Trip ={
    nameDriver:"",
    date:"",
    origin:"",
    destination:"",
    hour:"",
    model_car:"",
    brand_car:"",
    colour_car:"",
    seats:0,
    price:0,
  }

  constructor(private showViaje: ShowViajeService, private router :ActivatedRoute,
    private UpdateViajeService: UpdateViajeServiceService) {
    const viajes =  this.showViaje.read(this.router.snapshot.params['id'])
    viajes.then((response) => {
      console.log(response.data());
      if (response.data() == undefined) {
        console.log('Not Found')
        return undefined;
      }
      this.viaje= response.data();
      return true;
    })
    .catch((err) => {
      console.log(err)
      alert(err.message);
    })
  }

  onUpdate(){
    this.UpdateViajeService.updateTrip(this.viaje,this.router.snapshot.params['id']);
    console.log('Data add successfully');
    
  }

  ngOnInit(): void {
  }

}
