import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-carouselmultiple',
  templateUrl: './carouselmultiple.component.html',
  styleUrls: ['./carouselmultiple.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CarouselmultipleComponent implements OnInit {
  listaofertaarti:string[]=['articulo 0','articulo 1','articulo 2','articulo 3','articulo 4','articulo 5','articulo 6','articulo 7']
  constructor() { }

  ngOnInit() {
  }
  prueba(){
    //console.log('entra');
  }

}
