import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { ShowViajeService } from 'src/app/services/show-viaje-service.service';
import { ActivatedRoute } from '@angular/router';
import { UserTripsService } from 'src/app/services/user-trips.service';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  id: string
  userData: User;
  userCreatedTrips?:Map<string,string>;
  userRequestedTrips?:Map<string,string>;

  storage = getStorage()
  userProfilePic?:string;

  //userData = user desde auth
  constructor(private crudUserService: CrudUserService, private showViajeService: ShowViajeService, private userTripsService:UserTripsService, private router: ActivatedRoute) { // conseguir el email o id atraves del auth como parámetro
    this.userData = new User();
    this.id = this.router.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.read();
  }

  private getProfilePic() {
    const pictureRef = ref(this.storage, `${this.userData.id}/Picture/${this.userData.userPic}`);
    const picture = getDownloadURL(pictureRef);
    picture.then((url) => {
      this.userProfilePic = url;
    }).catch((err) => {
      console.log(err);
      alert("Se ha producido un error al cargar la foto de perfil");
      let noProfilePicRef = ref(this.storage, "no_profile_pic/profile_user.png");
      let noProfilePic = getDownloadURL(noProfilePicRef);
      noProfilePic.then((url) =>{
        this.userProfilePic = url;
      })
    })
  }

  public read(): void {
    const datos = this.crudUserService.read(this.id);
    datos.then((data) => {
      if(data != undefined) {
        this.userData = data;
        this.getProfilePic();
        this.userCreatedTrips = this.getUserTrips(0);
        this.userRequestedTrips = this.getUserTrips(1);
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Se ha producido un error al recuperar los datos");
    })
  }

  private getUserTrips(tripType: number): Map<string,string> {
    return this.userTripsService.getTripsForUser(this.id, tripType);
  }

}
