import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
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
import { NgFlashMessagesModule } from 'ng-flash-messages';
import { CarritocomprasComponent } from './carritocompras/carritocompras.component';
import { TerminosComponent } from './componentes/terminos/terminos.component';
import { PerfilUsuarioComponent } from './componentes/perfil-usuario/perfil-usuario.component';
import { PagoComponent } from './componentes/pago/pago.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ChatComponent } from './componentes/chat/chat.component';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { CompararEquiposComponent } from './componentes/comparar-equipos/comparar-equipos.component';


const routes : Route[] = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'restablecer', component: RestablecerComponent},
  {path: 'multicarro', component:CarouselmultipleComponent},
  {path: 'articulo', component:ArticuloComponent},
  {path: 'busqueda', component:ArticulosbusquedaComponent},
  {path: 'articulo/:id', component:ArticuloDetalleComponent},
  {path: 'cart', component:CarritocomprasComponent},
  {path: 'terminos', component: TerminosComponent},
  {path: 'perfil-usuario', component: PerfilUsuarioComponent},
  {path: 'pago', component: PagoComponent}
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
    CompararEquiposComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NgFlashMessagesModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MomentDateModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
