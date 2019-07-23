import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminosComponent } from '../componentes/terminos/terminos.component';

const routes: Routes = [
  {path: '', component: TerminosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminosRoutingModule { }
