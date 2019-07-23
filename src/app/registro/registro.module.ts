import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class RegistroModule { }
