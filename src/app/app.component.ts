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
}