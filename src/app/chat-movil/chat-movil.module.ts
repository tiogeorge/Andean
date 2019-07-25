import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatMovilRoutingModule } from './chat-movil-routing.module';
import { ChatmovilComponent } from '../componentes/chatmovil/chatmovil.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

@NgModule({
  declarations: [ChatmovilComponent],
  imports: [
    CommonModule,
    ChatMovilRoutingModule,
    FormsModule,
    MaterialModule
  ]
})
export class ChatMovilModule { }
