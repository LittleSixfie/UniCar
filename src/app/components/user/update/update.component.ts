import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { ShowViajeService } from 'src/app/services/show-viaje-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTripsService } from 'src/app/services/user-trips.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage'



@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: string;
  user: User;

  storage = getStorage()
  userLicense?: File
  userPicture?: File
  userCreatedTrips?: Map<string, string>;
  userRequestedTrips?: Map<string, string>;
<<<<<<< HEAD
  userFavTrips?:Map<string,string>;
=======
  userFavTrips?: Map<string, string>;
>>>>>>> 32cdfb1e06449956d9ac77bfe5a2c7b9e5092654

  constructor(private crudUserService: CrudUserService, private showViajeService: ShowViajeService, private userTripsService: UserTripsService, private router: ActivatedRoute) {
    this.user = new User();
    this.id = this.router.snapshot.params['id'];
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public inputControl: FormControl = new FormControl();

  public getUser(): void {
    const datos = this.crudUserService.read(this.id);
<<<<<<< HEAD
    datos.then((data) => {
      if(data != undefined) {
        this.user = data;
        this.getCreatedTrips();
        this.getRequestedTrips();
        this.getFavTrips();
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Se ha producido un error al recuperar los datos");
    })
  }

  public searchPicture(){
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/jpg'
    input.onchange = (e) => {
      if((<HTMLInputElement>e.target).files != null){
        this.userPicture = (<HTMLInputElement>e.target).files?.[0];
        this.user.userPic = this.userPicture?.name
      }

    }
    console.log(this.user.userPic);
    input.click()
  }

  private uploadPictures(){
    if(this.userPicture != undefined){
      const pictureRef = ref(this.storage, `${this.user.userEmail}/Picture/${this.user.userPic}`)
      uploadBytes(pictureRef, this.userPicture)
    }
    this.userPicture = undefined;
  }

  public getCreatedTrips(){
    let createdTrips = 0;
    this.userCreatedTrips = this.userTripsService.getTripsForUser(this.id, createdTrips);
  }

  public getRequestedTrips(){
    let requiredTrips = 1;
    this.userRequestedTrips = this.userTripsService.getTripsForUser(this.id, requiredTrips);
  }

  public getFavTrips(){
    let favTrips = 2;
    this.userFavTrips = this.userTripsService.getTripsForUser(this.id, favTrips);
=======
    datos.then((datos) => {
      this.user = datos;
      this.userCreatedTrips = this.getUserTrips(0);
      this.userRequestedTrips = this.getUserTrips(1);
      this.userFavTrips = this.getUserTrips(2);
    })
  }
  private getUserTrips(tripType: number): Map<string,string> {
    return this.userTripsService.getTripsForUser(this.id, tripType);
>>>>>>> 32cdfb1e06449956d9ac77bfe5a2c7b9e5092654
  }

  ngOnInit(): void {
    this.getUser();
    this.inputControl = new FormControl();
<<<<<<< HEAD
=======
    this.getUser();
>>>>>>> 32cdfb1e06449956d9ac77bfe5a2c7b9e5092654
  }

  onUpdate() {
    if (this.user != undefined) this.crudUserService.update(this.router.snapshot.params['id'], this.user);
  }

  public update(): void {
    if (this.user != undefined){
      this.uploadPictures();
      this.crudUserService.update(this.id, this.user);
    } 

  }

}
