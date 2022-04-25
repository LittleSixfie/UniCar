import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { provideFirestore,getFirestore,connectFirestoreEmulator  } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp, getApp } from '@angular/fire/app';
import {MatCardModule} from '@angular/material/card'; 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViajeComponent } from './viaje/viaje.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { ShowViajeComponent } from './show-viaje/show-viaje.component';
import { CreateComponent } from './components/user/create/create.component';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    ShowViajeComponent,
    AppComponent,
    ViajeComponent,
    CreateComponent,
    ShowViajeComponent,
    HomePageComponent
  ],
  imports: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatCardModule,
    NoopAnimationsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
