import { Component, OnInit } from '@angular/core';
import { SesionService } from '../perfil-usuario/sesion.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  link_copyright : string = "https://www.facebook.com/andeantecnology/";
  link_desarrollador : string = "https://www.google.com";
  link_facebook : string = "https://www.facebook.com/andeantecnology/";

  constructor(public sesionService : SesionService) { }

  ngOnInit() {
    this.sesionService.nuevaSesion().subscribe(res => {
      console.log(res);
    })
  }

}
