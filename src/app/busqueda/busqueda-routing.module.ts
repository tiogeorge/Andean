import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticulosbusquedaComponent } from '../componentes/articulosbusqueda/articulosbusqueda.component';
import { PublicAuthGuard } from '../componentes/public-auth.guard';

const routes: Routes = [
  {path: '/:tipobus/:pclave', component: ArticulosbusquedaComponent, canActivate: [PublicAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusquedaRoutingModule { }
