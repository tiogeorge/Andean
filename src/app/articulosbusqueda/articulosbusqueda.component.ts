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
  autoTicks = false;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  vertical = false;
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;

  //fin slider

  constructor() { }
  
  ngOnInit() {
  }
}
