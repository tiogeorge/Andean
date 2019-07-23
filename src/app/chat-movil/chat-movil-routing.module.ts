import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatmovilComponent } from '../componentes/chatmovil/chatmovil.component';

const routes: Routes = [
  {path: '', component: ChatmovilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatMovilRoutingModule { }
