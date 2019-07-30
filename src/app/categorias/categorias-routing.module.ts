import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuCategoriasComponent } from '../componentes/menu-categorias/menu-categorias.component';

const routes: Routes = [
  {path: '', component: MenuCategoriasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
