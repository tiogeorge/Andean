import { BrowserModule, Title, Meta } from '@angular/platform-browser';
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
import { ArticulosbusquedaComponent } from './componentes/articulosbusqueda/articulosbusqueda.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { ChatmovilComponent } from './componentes/chatmovil/chatmovil.component';
import {AuthGuard} from './componentes/auth.guard';
import { PublicAuthGuard} from './componentes/public-auth.guard';
import { TokenInterceptorService } from './componentes/token-interceptor.service';
import { MenuCategoriasComponent } from './componentes/menu-categorias/menu-categorias.component';
import { MenuUsuarioComponent } from './componentes/menu-usuario/menu-usuario.component';

const routes : Route[] = [
  {path: '', component: HomeComponent, canActivate: [PublicAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [PublicAuthGuard]},
  {path: 'home', component: HomeComponent,canActivate: [PublicAuthGuard]},
  {path: 'registro', component: RegistroComponent,canActivate: [PublicAuthGuard]},
  {path: 'restablecer', component: RestablecerComponent,canActivate: [PublicAuthGuard]},
  {path: 'multicarro', component:CarouselmultipleComponent,canActivate: [PublicAuthGuard]},
  {path: 'busqueda/:tipobus/:pclave', component:ArticulosbusquedaComponent,canActivate: [PublicAuthGuard]},
  {path: 'articulo/:id', component:ArticuloDetalleComponent,canActivate: [PublicAuthGuard]},
  {path: 'cart', component:CarritocomprasComponent,canActivate: [PublicAuthGuard]},
  {path: 'terminos', component: TerminosComponent,canActivate: [PublicAuthGuard]},
  {path: 'perfil-usuario', component: PerfilUsuarioComponent, canActivate: [AuthGuard]},
  {path: 'pago', component: PagoComponent, canActivate: [AuthGuard]},
  {path: 'compararEqui',component:CompararEquiposComponent},
  {path: 'cambiarPassword/:token', component: CambiarPasswordComponent},
  {path: 'chat', component: ChatmovilComponent,canActivate: [PublicAuthGuard]},
  {path: 'usuario', component: MenuUsuarioComponent,canActivate: [PublicAuthGuard]},
  {path: 'categorias', component: MenuCategoriasComponent,canActivate: [PublicAuthGuard]}
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
    ValoracionComponent,
    ChatmovilComponent,
    MenuCategoriasComponent,
    MenuUsuarioComponent
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
  providers: [Title, Meta, AuthGuard, PublicAuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
