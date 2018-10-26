import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-articulosbusqueda',
  templateUrl: './articulosbusqueda.component.html',
  styleUrls: ['./articulosbusqueda.component.css'],
})
export class ArticulosbusquedaComponent implements OnInit {
  selected = 'option2';
  listacategorias: string[] = ['categoria 1', 'categoria 2', 'categoria 3', 'categoria 4', 'categoria 5', 'categoria 6', 'categoria 7', 'categoria 8', 'categoria 9', 'categoria 10'];
  //slider
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  //fin slider

  constructor() { }
  
  ngOnInit() {
  }
}
