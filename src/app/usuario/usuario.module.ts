import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { MenuUsuarioComponent } from '../componentes/menu-usuario/menu-usuario.component';
import { MaterialModule } from '../material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class UsuarioModule { }
