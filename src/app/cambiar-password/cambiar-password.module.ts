import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CambiarPasswordRoutingModule } from './cambiar-password-routing.module';
import { CambiarPasswordComponent } from '../componentes/restablecer/cambiar-password/cambiar-password.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { CarouselComponent } from '../componentes/carousel/carousel.component';
import { CarouselmultipleComponent } from '../componentes/carouselmultiple/carouselmultiple.component';
import { MapaComponent } from '../componentes/mapa/mapa.component';
import { RedessocialesComponent } from '../componentes/redessociales/redessociales.component';

@NgModule({
  declarations: [
    CambiarPasswordComponent,
    CarouselComponent,
    CarouselmultipleComponent,
    MapaComponent,
    RedessocialesComponent
    
  ],
  imports: [
    CommonModule,
    CambiarPasswordRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class CambiarPasswordModule { }
