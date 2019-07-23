import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticuloRoutingModule } from './articulo-routing.module';
import { ArticuloDetalleComponent } from '../componentes/articulo-detalle/articulo-detalle.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { ValoracionComponent } from '../componentes/valoracion/valoracion.component';
import { DialogoCarritoComponent } from '../componentes/articulo-detalle/dialogo-carrito/dialogo-carrito.component';

@NgModule({
  declarations: [
    ArticuloDetalleComponent,
    ValoracionComponent,
    DialogoCarritoComponent
  ],
  imports: [
    CommonModule,
    ArticuloRoutingModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents: [
    DialogoCarritoComponent
  ]
})
export class ArticuloModule { }
