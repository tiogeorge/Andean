import { Component, HostListener } from '@angular/core';
import { UsuarioService} from './componentes/perfil-usuario/usuario.service';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public usuarioService: UsuarioService,public  router : Router){

  }
  ngOnInit() {
    /*this.router.events.subscribe((event: Event)=>{
      if (event instanceof NavigationEnd) {
        if(event.url != "/comunicado"){
          this.router.navigate(['/comunicado']);
          console.log("no esats en aviso");
        }
      }
    });*/

  }
  
}
