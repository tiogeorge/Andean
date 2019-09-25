import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SobreNosotrosComponent } from '../componentes/sobre-nosotros/sobre-nosotros.component';

const routes: Routes = [
  {path: '', component: SobreNosotrosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SobreNosotrosRoutingModule { }
