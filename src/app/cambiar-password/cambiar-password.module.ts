import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CambiarPasswordRoutingModule } from './cambiar-password-routing.module';
import { CambiarPasswordComponent } from '../componentes/restablecer/cambiar-password/cambiar-password.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [CambiarPasswordComponent],
  imports: [
    CommonModule,
    CambiarPasswordRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CambiarPasswordModule { }
