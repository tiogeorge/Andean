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
import { SobreNosotrosComponent } from './componentes/sobre-nosotros/sobre-nosotros.component';
import { PaginaMantemientoComponent } from './componentes/pagina-mantemiento/pagina-mantemiento.component';
import { MenuUsuarioComponent } from './componentes/menu-usuario/menu-usuario.component';
import { DialogCategoriasComponent } from './componentes/dialog-categorias/dialog-categorias.component';

const routes : Route[] = [
  {path: '', component: HomeComponent, canActivate: [PublicAuthGuard]},
  {path: 'home', component: HomeComponent,canActivate: [PublicAuthGuard]},
  {path: 'login', loadChildren: './login/login.module#LoginModule', canActivate: [PublicAuthGuard]},
  {path: 'registro', loadChildren: './registro/registro.module#RegistroModule', canActivate: [PublicAuthGuard]},
  {path: 'restablecer', loadChildren: './restablecer/restablecer.module#RestablecerModule' ,canActivate: [PublicAuthGuard]},
  {path: 'busqueda/:tipobus/:pclave/:page', loadChildren: './busqueda/busqueda.module#BusquedaModule',canActivate: [PublicAuthGuard]},
  {path: 'articulo/:id', loadChildren: './articulo/articulo.module#ArticuloModule',canActivate: [PublicAuthGuard]},
  {path: 'cart', loadChildren: './carro-compras/carro-compras.module#CarroComprasModule',canActivate: [PublicAuthGuard]},
  {path: 'terminos', loadChildren: './terminos/terminos.module#TerminosModule',canActivate: [PublicAuthGuard]},
  {path: 'perfil-usuario', loadChildren: './perfil-usuario/perfil-usuario.module#PerfilUsuarioModule', canActivate: [AuthGuard]},
  {path: 'pago', loadChildren: './pago/pago.module#PagoModule', canActivate: [AuthGuard]},
  {path: 'cambiarPassword/:token', loadChildren: './cambiar-password/cambiar-password.module#CambiarPasswordModule', canActivate: [PublicAuthGuard]},
  {path: 'chat', loadChildren: './chat-movil/chat-movil.module#ChatMovilModule',canActivate: [PublicAuthGuard]},
  {path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule',canActivate: [PublicAuthGuard]},
  {path: 'categorias', loadChildren: './categorias/categorias.module#CategoriasModule',canActivate: [PublicAuthGuard]},
  {path: 'sobre-nosotros', loadChildren: './sobre-nosotros/sobre-nosotros.module#SobreNosotrosModule',canActivate: [PublicAuthGuard]},
  {path: 'comunicado', component: PaginaMantemientoComponent,canActivate: [PublicAuthGuard]},
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
    PaginaMantemientoComponent,
    MenuUsuarioComponent,
    DialogCategoriasComponent
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
    SnackbarComponent,
    DialogCategoriasComponent
  ],
  providers: [Title, Meta, AuthGuard, PublicAuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
