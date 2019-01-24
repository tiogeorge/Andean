import { Component, OnInit, ViewChild } from '@angular/core';
import { TiendaService } from './tienda.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat         : number = -13.5226402;
  lng         : number = -71.9673386;

  constructor(public tiendaService: TiendaService) { }

  ngOnInit() {
    this.tiendaService.getTiendas().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        this.tiendaService.tiendas = jres.data;
      } 
    });
  }

}
