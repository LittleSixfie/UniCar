import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShowViajeComponent } from './show-viaje/show-viaje.component';
import { ViajeComponent } from './viaje/viaje.component';
import { CreateComponent } from './components/user/create/create.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { ReadComponent } from './components/user/read/read.component';
import { UpdateComponent } from './components/user/update/update.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UpdateViajeComponent } from './update-viaje/update-viaje.component';
import { ManagePassengersComponent } from './manage-passengers/manage-passengers.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';

const routes: Routes = [
  { path: 'viaje/:id', component: ShowViajeComponent },
  { path: 'crearViaje', component: ViajeComponent },
  { path: 'modificarViaje/:id', component: UpdateViajeComponent },
  { path: 'registrarse', component: CreateComponent },
  { path: 'userDelete/:id', component: DeleteComponent },
  { path: 'miCuenta/:id', component: ReadComponent },
  { path: 'modificarUsuario/:id', component: UpdateComponent },
  { path: 'home', component: HomePageComponent },
  //{path:'registry', component:},
  {path:'sesion', component: SignInComponent},
  //{path:'puntuaviaje', component:},
  //{path:'puntuaCompañeros', component:},
  {path:'managePassenger/:id', component: ManagePassengersComponent},
  { path: '**', component: HomePageComponent },
  //{path:'search, component:},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
