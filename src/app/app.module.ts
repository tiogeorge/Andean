import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { CarouselComponent } from './componentes/carousel/carousel.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { CarouselmultipleComponent } from './componentes/carouselmultiple/carouselmultiple.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RestablecerComponent } from './componentes/restablecer/restablecer.component';
import { PortafolioComponent } from './componentes/portafolio/portafolio.component';
import { ArticuloDetalleComponent } from './componentes/articulo-detalle/articulo-detalle.component';
import { ArticuloComponent } from './componentes/articulo/articulo.component';
import { ArticulosbusquedaComponent } from './componentes/articulosbusqueda/articulosbusqueda.component';
import { HttpClientModule } from '@angular/common/http';
import { CarritocomprasComponent } from './componentes/carritocompras/carritocompras.component';
import { TerminosComponent } from './componentes/terminos/terminos.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PagoComponent } from './componentes/pago/pago.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { CompararEquiposComponent } from './componentes/comparar-equipos/comparar-equipos.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { DialogoCarritoComponent } from './componentes/articulo-detalle/dialogo-carrito/dialogo-carrito.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SnackbarComponent } from './componentes/snackbar/snackbar.component';
import { CambiarPasswordComponent } from './componentes/restablecer/cambiar-password/cambiar-password.component';
import { CategoriahomeComponent } from './componentes/categoriahome/categoriahome.component';
import { RedessocialesComponent } from './componentes/redessociales/redessociales.component';
import { ValoracionComponent } from './componentes/valoracion/valoracion.component';

const routes : Route[] = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'restablecer', component: RestablecerComponent},
  {path: 'multicarro', component:CarouselmultipleComponent},
  {path: 'articulo', component:ArticuloComponent},
  {path: 'busqueda/:tipobus/:pclave', component:ArticulosbusquedaComponent},
  {path: 'articulo/:id', component:ArticuloDetalleComponent},
  {path: 'cart', component:CarritocomprasComponent},
  {path: 'terminos', component: TerminosComponent},
  {path: 'perfil-usuario', component: PerfilUsuarioComponent},
  {path: 'pago', component: PagoComponent},
  {path: 'compararEqui',component:CompararEquiposComponent},
  {path: 'cambiarPassword/:token', component: CambiarPasswordComponent}
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
    ArticuloComponent,
    ArticulosbusquedaComponent,
    CarritocomprasComponent,
    TerminosComponent,
    PerfilUsuarioComponent,
    PagoComponent,
    PedidosComponent,
    ChatComponent,
    CompararEquiposComponent,
    MapaComponent,
    DialogoCarritoComponent,
    SnackbarComponent,
    CambiarPasswordComponent,
    CategoriahomeComponent,
    RedessocialesComponent,
    ValoracionComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBdQR9bsblCqFPBmv7L8Yy2uAgsazSXtaM'
    }),
    ReactiveFormsModule,
    HttpClientModule,
    MomentDateModule,
    MatMomentDateModule,
    Ng5SliderModule
  ],
  entryComponents: [
    DialogoCarritoComponent,
    SnackbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
