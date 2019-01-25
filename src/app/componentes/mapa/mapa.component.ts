import { Component, OnInit, ViewChild } from '@angular/core';
import { Respuesta } from '../perfil-usuario/respuesta';
import { TiendaService } from './tienda.service';
import { Tienda } from './tienda';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat         : number = -13.5226402;
  lng         : number = -71.9673386;
  zoom        : number = 16;

  constructor(public tiendaService: TiendaService) { }

  ngOnInit() {
    this.tiendaService.getTiendas().subscribe(res => {
      const respuesta = res as Respuesta;
      if(respuesta.status){
        this.tiendaService.tiendas = respuesta.data;
      } 
    });
    this.encontrarCliente();
  }

  encontrarCliente() {
    if( navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.tiendaService.tiendas.push(new Tienda('','¡Aqui estoy!', position.coords.latitude, position.coords.longitude));
      });
    }
  }

}
