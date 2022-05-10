import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { provideFirestore,getFirestore,connectFirestoreEmulator  } from '@angular/fire/firestore';
import { initializeApp,provideFirebaseApp, getApp } from '@angular/fire/app';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViajeComponent } from './viaje/viaje.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './components/user/create/create.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MatNativeDateModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';  
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutingModule } from './app-routing.module';
import { ShowViajeComponent } from './show-viaje/show-viaje.component';
import { ReadComponent } from './components/user/read/read.component';
import { UpdateComponent } from './components/user/update/update.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { MatDividerModule } from '@angular/material/divider';
import { UpdateViajeComponent } from './update-viaje/update-viaje.component';
import { ManagePassengersComponent } from './manage-passengers/manage-passengers.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';

@NgModule({
  declarations: [
    ShowViajeComponent,
    AppComponent,
    ViajeComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    HeaderComponent,
    FooterComponent,
    ShowViajeComponent,
    HomePageComponent,
    UpdateViajeComponent,
    ManagePassengersComponent,
    SignInComponent,
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
    AppRoutingModule,
    MatDividerModule,
    MatListModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
