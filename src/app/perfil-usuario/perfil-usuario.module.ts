import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilUsuarioRoutingModule } from './perfil-usuario-routing.module';
import { PerfilUsuarioComponent } from '../componentes/perfil-usuario/perfil-usuario.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [PerfilUsuarioComponent],
  imports: [
    CommonModule,
    PerfilUsuarioRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class PerfilUsuarioModule { }
