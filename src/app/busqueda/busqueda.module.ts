import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng5SliderModule } from 'ng5-slider';
import { BusquedaRoutingModule } from './busqueda-routing.module';
import { ArticulosbusquedaComponent } from '../componentes/articulosbusqueda/articulosbusqueda.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [
    ArticulosbusquedaComponent
  ],
  imports: [
    CommonModule,
    BusquedaRoutingModule,
    FormsModule,
    MaterialModule,
    Ng5SliderModule
  ]
})
export class BusquedaModule { }
