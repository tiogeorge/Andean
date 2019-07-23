import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarroComprasRoutingModule } from './carro-compras-routing.module';
import { CarritocomprasComponent } from '../componentes/carritocompras/carritocompras.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [
    CarritocomprasComponent
  ],
  imports: [
    CommonModule,
    CarroComprasRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CarroComprasModule { }
