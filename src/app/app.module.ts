import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselmultipleComponent } from './carouselmultiple/carouselmultiple.component';
import { RegistroComponent } from './registro/registro.component';
import { RestablecerComponent } from './restablecer/restablecer.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { ArticuloDetalleComponent } from './articulo-detalle/articulo-detalle.component';
import { ArticuloComponent } from './articulo/articulo.component';

const routes : Route[] = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'carousel',component:  CarouselComponent},
  {path: 'home', component: HomeComponent},
  {path: 'footer', component: FooterComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'restablecer', component: RestablecerComponent},
  {path: 'multicarro', component:CarouselmultipleComponent},
  {path: 'articulo', component:ArticuloComponent},
  {path: 'articulo/:id', component:ArticuloDetalleComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CarouselComponent,
    FooterComponent,
    CarouselmultipleComponent,
    RegistroComponent,
    RestablecerComponent,
    PortafolioComponent,
    ArticuloDetalleComponent,
    ArticuloComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
