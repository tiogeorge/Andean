import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { PublicAuthGuard } from '../componentes/public-auth.guard';

const routes: Routes = [
  {path: '', component: RegistroComponent, canActivate: [PublicAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
