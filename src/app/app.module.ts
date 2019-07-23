import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { PortafolioComponent } from './componentes/portafolio/portafolio.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChatComponent } from './componentes/chat/chat.component';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import { Ng5SliderModule } from 'ng5-slider';
import { SnackbarComponent } from './componentes/snackbar/snackbar.component';
import { CategoriahomeComponent } from './componentes/categoriahome/categoriahome.component';
import {AuthGuard} from './componentes/auth.guard';
import { PublicAuthGuard} from './componentes/public-auth.guard';
import { TokenInterceptorService } from './componentes/token-interceptor.service';
import { MenuCategoriasComponent } from './componentes/menu-categorias/menu-categorias.component';
import { MenuUsuarioComponent } from './componentes/menu-usuario/menu-usuario.component';

const routes : Route[] = [
  {path: '', component: HomeComponent, canActivate: [PublicAuthGuard]},
  {path: 'home', component: HomeComponent,canActivate: [PublicAuthGuard]},
  {path: 'login', loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule), canActivate: [PublicAuthGuard]},
  {path: 'registro', loadChildren: () => import('./registro/registro.module').then(mod => mod.RegistroModule), canActivate: [PublicAuthGuard]},
  {path: 'restablecer', loadChildren: () => import('./restablecer/restablecer.module').then(mod => mod.RestablecerModule) ,canActivate: [PublicAuthGuard]},
  {path: 'busqueda/:tipobus/:pclave', loadChildren: () => import('./busqueda/busqueda.module').then(mod => mod.BusquedaModule) ,canActivate: [PublicAuthGuard]},
  {path: 'articulo/:id', loadChildren: () => import('./articulo/articulo.module').then(mod => mod.ArticuloModule),canActivate: [PublicAuthGuard]},
  {path: 'cart', loadChildren: () => import('./carro-compras/carro-compras.module').then(mod => mod.CarroComprasModule),canActivate: [PublicAuthGuard]},
  {path: 'terminos', loadChildren: () => import('./terminos/terminos.module').then(mod => mod.TerminosModule),canActivate: [PublicAuthGuard]},
  {path: 'perfil-usuario', loadChildren: () => import('./perfil-usuario/perfil-usuario.module').then(mod => mod.PerfilUsuarioModule), canActivate: [AuthGuard]},
  {path: 'pago', loadChildren: () => import('./pago/pago.module').then(mod => mod.PagoModule), canActivate: [AuthGuard]},
  {path: 'cambiarPassword/:token', loadChildren: () => import('./cambiar-password/cambiar-password.module').then(mod => mod.CambiarPasswordModule)},
  {path: 'chat', loadChildren: () => import('./chat-movil/chat-movil.module').then(mod => mod.ChatMovilModule),canActivate: [PublicAuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    PortafolioComponent,
    ChatComponent,
    SnackbarComponent,
    CategoriahomeComponent,
    MenuCategoriasComponent,
    MenuUsuarioComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    HttpClientModule,
    MomentDateModule,
    MatMomentDateModule,
    Ng5SliderModule
  ],
  entryComponents: [
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
