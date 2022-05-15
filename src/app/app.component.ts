import { Component } from '@angular/core';
import { ReadComponent } from './components/user/read/read.component';
import { CrudUserService } from './services/crud-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UniCar';
  user = false;
  userid=""
  userName=""

  setUser(userAuth:string, usernombre:string){
    this.userid= userAuth;
    this.user=true
    this.userName = usernombre
  }

  getUserId(): string {
    if(this.user){
      return this.userid
    }
    return ""
  }

  getUserName(): string {
    if(this.user){
      return this.userName
    }
    return ""
  }
  
}