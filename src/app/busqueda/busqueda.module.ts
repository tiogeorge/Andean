import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusquedaRoutingModule } from './busqueda-routing.module';
import { ArticulosbusquedaComponent } from '../componentes/articulosbusqueda/articulosbusqueda.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ArticulosbusquedaComponent
  ],
  imports: [
    CommonModule,
    BusquedaRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class BusquedaModule { }
