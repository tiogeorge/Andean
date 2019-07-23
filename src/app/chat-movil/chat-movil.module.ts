import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatMovilRoutingModule } from './chat-movil-routing.module';
import { ChatmovilComponent } from '../componentes/chatmovil/chatmovil.component';

@NgModule({
  declarations: [ChatmovilComponent],
  imports: [
    CommonModule,
    ChatMovilRoutingModule
  ]
})
export class ChatMovilModule { }
