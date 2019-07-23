import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../componentes/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../material';
import { MenuComponent } from '../componentes/menu/menu.component';
import { FooterComponent } from '../componentes/footer/footer.component';
import { ChatComponent } from '../componentes/chat/chat.component';
import { SnackbarComponent } from '../componentes/snackbar/snackbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent,
    FooterComponent,
    ChatComponent,
    SnackbarComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  entryComponents: [
    SnackbarComponent
  ]
})
export class LoginModule { }
