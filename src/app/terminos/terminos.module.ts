import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminosRoutingModule } from './terminos-routing.module';
import { TerminosComponent } from '../componentes/terminos/terminos.component';
import { MaterialModule } from '../material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TerminosComponent
  ],
  imports: [
    CommonModule,
    TerminosRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class TerminosModule { }
