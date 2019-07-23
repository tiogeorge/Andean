import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestablecerComponent } from '../componentes/restablecer/restablecer.component';
import { PublicAuthGuard } from '../componentes/public-auth.guard';

const routes: Routes = [
  {path: '', component: RestablecerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestablecerRoutingModule { }
