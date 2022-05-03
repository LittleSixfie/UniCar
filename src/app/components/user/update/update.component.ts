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
  userCreatedTrips?: string[];
  userRequestedTrips?: string[];
  userFavTrips?: string[];

  storage = getStorage()
  userLicense?: File
  userPicture?: File

  constructor(private crudUserService: CrudUserService, private showViajeService: ShowViajeService, private userTripsService: UserTripsService, private router: ActivatedRoute) {
    this.user = new User();
    this.id = this.router.snapshot.params['id'];
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public inputControl: FormControl = new FormControl();

  public getUser(): void {
    const datos = this.crudUserService.read(this.id);
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

  public getCreatedTrips() {
    /**
     this.userTripsService.getCreatedTripsForUser(this.id).then((datos) =>{
       this.userCreatedTrips = datos;
     });     
     */
     let a = JSON.stringify(this.user?.createdTrips);
     this.userCreatedTrips = Object.keys(JSON.parse(a));
  }

  public getRequestedTrips(){
    let a = JSON.stringify(this.user?.requestedTrips);
    this.userRequestedTrips = Object.keys(JSON.parse(a));
  }

  public getFavTrips(){
    let a = JSON.stringify(this.user?.favTrips);
    this.userFavTrips = Object.keys(JSON.parse(a));
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
    /**
      if(this.License !=  undefined){
      const licenseRef = ref(this.storage, `${this.user.userEmail}/License/${this.user.userDriverLicense}`)
      uploadBytes(licenseRef, this.License)
      }
    */
    if(this.userPicture != undefined){
      const pictureRef = ref(this.storage, `${this.user.userEmail}/Picture/${this.user.userPic}`)
      uploadBytes(pictureRef, this.userPicture)
    }
    //this.License = undefined;
    this.userPicture = undefined;
  }

  ngOnInit(): void {
    this.getUser();
    this.inputControl = new FormControl();
  }

  onUpdate() {
    if (this.user != undefined) this.crudUserService.update(this.router.snapshot.params['id'], this.user);
  }

  public update(): void {
    if (this.user != undefined) this.crudUserService.update(this.id, this.user);
  }

}
