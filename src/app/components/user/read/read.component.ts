import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudUserService } from 'src/app/services/crud-user.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  email: String

  constructor(private service: CrudUserService, email : String) {
    this.email = email;
  }

  ngOnInit(): void {
  }

  public read(): void {
    
  }

}
