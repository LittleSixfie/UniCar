import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-header-sign-in',
  templateUrl: './header-sign-in.component.html',
  styleUrls: ['./header-sign-in.component.css']
})
export class HeaderSignInComponent implements OnInit {
  constructor(private router: Router) {}
  auth = getAuth();

  ngOnInit(): void {}

  public vamoPalPerfil() {
    this.router.navigate(['/miCuenta/' + this.auth.currentUser?.uid  ]);
  }

  public home() {
    this.router.navigate(['/home']);
  }
}
