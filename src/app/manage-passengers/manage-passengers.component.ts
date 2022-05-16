import { Component, OnInit } from '@angular/core';
import { ShowViajeService } from '../services/show-viaje.service';
import { ActivatedRoute } from '@angular/router';
import { UpdateViajeServiceService } from '../services/update-viaje-service.service';
import { Trip } from '../models/trips.model';


@Component({
  selector: 'app-manage-passengers',
  templateUrl: './manage-passengers.component.html',
  styleUrls: ['./manage-passengers.component.css']
})
export class ManagePassengersComponent implements OnInit {
  passengers:string[] | undefined = [];
  viaje:Trip = {};

  constructor(private showViaje: ShowViajeService, private router :ActivatedRoute,private UpdateViajeService: UpdateViajeServiceService ) { }

  async ngOnInit(): Promise<void> {
    let viaje = this.showViaje.read(this.router.snapshot.params['id'])
    await viaje.then((response) => {
      if (response.data() == undefined) {
        console.log('Not Found')
        return undefined;
      }
      this.passengers= response.data().passenger;
      this.viaje = response.data()
      console
      return true;
    })
    .catch((err) => {
      console.log(err)
      alert(err.message);
    })
  }

  deleteArr(string:string){
    for(let i = 0; i < string.length; i++){
      if(this.passengers![i]== string){
        this.passengers!.splice(i, 1);
      }
    }
  }

  async delete(){
    this.viaje.passenger = this.passengers
    await this.UpdateViajeService.updateTrip(this.viaje,this.router.snapshot.params['id']);
  }
}
