import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagoRoutingModule } from './pago-routing.module';
import { PagoComponent } from '../componentes/pago/pago.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [PagoComponent],
  imports: [
    CommonModule,
    PagoRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class PagoModule { }
