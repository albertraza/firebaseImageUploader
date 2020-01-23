import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargarComponent } from './components/cargar/cargar.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
