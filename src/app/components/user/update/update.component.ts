import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { ShowViajeService } from 'src/app/services/show-viaje-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTripsService } from 'src/app/services/user-trips.service';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'



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
  userPicUrl?: string
  userCreatedTrips?: Map<string, string>;
  userRequestedTrips?: Map<string, string>;
  userFavTrips?: Map<string, string>;

  constructor(private crudUserService: CrudUserService, private userTripsService: UserTripsService, private router: ActivatedRoute) {
    this.user = new User();
    this.id = this.router.snapshot.params['id'];
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public inputControl: FormControl = new FormControl();

  public getUser(): void {
    const datos = this.crudUserService.read(this.id);
    datos.then((data) => {
      if (data != undefined) {
        this.user = data;
        this.userCreatedTrips = this.getUserTrips(0);
        this.userRequestedTrips = this.getUserTrips(1);
        this.userFavTrips = this.getUserTrips(2);
        this.getProfilePic();
      }
    })
      .catch((err) => {
        console.log(err);
        alert("Se ha producido un error al recuperar los datos");
      })
  }

  public searchPicture() {
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/jpg'
    input.onchange = (e) => {
      if ((<HTMLInputElement>e.target).files != null) {
        this.userPicture = (<HTMLInputElement>e.target).files?.[0];
        this.user.userPic = this.userPicture?.name
        this.uploadPictures();
        this.getProfilePic();
      }

    };
    console.log(this.user.userPic);
    input.click();
  }

  private uploadPictures() {
    if (this.userPicture != undefined) {
      const pictureRef = ref(this.storage, `${this.user.id}/Picture/${this.user.userPic}`)
      uploadBytes(pictureRef, this.userPicture)
    }
    this.userPicture = undefined;
  }

  private getProfilePic() {
    const pictureRef = ref(this.storage, `${this.user.id}/Picture/${this.user.userPic}`);
    const picture = getDownloadURL(pictureRef);
    picture.then((url) => {
      this.userPicUrl = url;
    })
    .catch((err) => {
      console.log(err);
      alert("Se ha producido un error al cargar la foto de perfil");
      let noProfilePicRef = ref(this.storage, "no_profile_pic/profile_user.png");
      let noProfilePic = getDownloadURL(noProfilePicRef);
      noProfilePic.then((url) =>{
        this.userPicUrl = url;
      })
    })
  }

  private getUserTrips(tripType: number): Map<string, string> {
    return this.userTripsService.getTripsForUser(this.id, tripType);
  }

  ngOnInit(): void {
    this.getUser();
    this.inputControl = new FormControl();
  }

  public update(): void {
    if (this.user != undefined) {
      this.uploadPictures();
      this.crudUserService.update(this.id, this.user);
    }

  }

}
