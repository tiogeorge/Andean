import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuUsuarioComponent } from '../componentes/menu-usuario/menu-usuario.component';

const routes: Routes = [
  {path: '', component: MenuUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
