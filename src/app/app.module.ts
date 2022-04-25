import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShowViajeComponent } from './show-viaje/show-viaje.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon'; 
import {MatCardModule} from '@angular/material/card'; 
import { MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { environment } from '../environments/environment';
import { initializeApp,provideFirebaseApp, getApp } from '@angular/fire/app';
import { provideFirestore,getFirestore,connectFirestoreEmulator  } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    ShowViajeComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    NgbModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
