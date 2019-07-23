import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticuloDetalleComponent } from '../componentes/articulo-detalle/articulo-detalle.component';

const routes: Routes = [
  {path: '', component: ArticuloDetalleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticuloRoutingModule { }
