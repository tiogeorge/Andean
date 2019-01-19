import { Component, OnInit } from '@angular/core';
import { TiendaService } from './tienda.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  public tiendaService     : TiendaService;
  lat         : number = -13.5226402;
  lng         : number = -71.9673386;

  constructor(tiendaService: TiendaService) {
    this.tiendaService = tiendaService;
   }

  ngOnInit() {
    this.tiendaService.getTiendas().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        this.tiendaService.tiendas = jres.data;
      } 
    });
    console.log('Hola desde el mapa');
  }

}
