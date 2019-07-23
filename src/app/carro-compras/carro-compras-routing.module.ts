import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarritocomprasComponent } from '../componentes/carritocompras/carritocompras.component';

const routes: Routes = [
  {path: '', component: CarritocomprasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarroComprasRoutingModule { }
