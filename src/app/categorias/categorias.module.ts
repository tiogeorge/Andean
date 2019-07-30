import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { MenuCategoriasComponent } from '../componentes/menu-categorias/menu-categorias.component';
import { MaterialModule } from '../material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MenuCategoriasComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class CategoriasModule { }
