import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat         : number = -13.5226402;
  lng         : number = -71.9673386;

  constructor() { }

  ngOnInit() {
    console.log('Hola desde el mapa');
  }

}
