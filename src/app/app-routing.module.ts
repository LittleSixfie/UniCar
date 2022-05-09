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

const routes: Routes = [
  { path: 'viaje/:id', component: ShowViajeComponent },
  { path: 'crearViaje', component: ViajeComponent },
  { path: 'updateViaje/:id', component: UpdateViajeComponent },
  { path: 'registrarse', component: CreateComponent },
  { path: 'userDelete/:id', component: DeleteComponent },
  { path: 'miCuenta/:id', component: ReadComponent },
  { path: 'userUpdate/:id', component: UpdateComponent },
  { path: 'home', component: HomePageComponent },
  //{path:'registry', component:},
  //{path:'sesion', component:},
  //{path:'puntuaviaje', component:},
  //{path:'puntuaCompañeros', component:},
  //{path:'politicaDatos', component:},
  { path: '**', component: HomePageComponent },
  //{path:'search, component:},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
