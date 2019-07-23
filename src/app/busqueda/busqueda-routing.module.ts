import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticulosbusquedaComponent } from '../componentes/articulosbusqueda/articulosbusqueda.component';

const routes: Routes = [
  {path: '', component: ArticulosbusquedaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusquedaRoutingModule { }
