import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobreNosotrosRoutingModule } from './sobre-nosotros-routing.module';
import { SobreNosotrosComponent } from '../componentes/sobre-nosotros/sobre-nosotros.component';
import { MaterialModule } from '../material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SobreNosotrosComponent
  ],
  imports: [
    CommonModule,
    SobreNosotrosRoutingModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class SobreNosotrosModule { }
