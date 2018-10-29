import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';



//filtro marca

//fin filtro
@Component({
  selector: 'app-articulosbusqueda',
  templateUrl: './articulosbusqueda.component.html',
  styleUrls: ['./articulosbusqueda.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticulosbusquedaComponent implements OnInit {
  selected = 'option2';
  listacategorias: string[] = ['categoria 1', 'categoria 2', 'categoria 3', 'categoria 4', 'categoria 5', 'categoria 6', 'categoria 7', 'categoria 8', 'categoria 9', 'categoria 10'];
  listamarcas: string[] = ['marca 1', 'marca2', 'marca3', 'marca4', 'marca5', 'marca6', 'marca7', 'marca8'];
  listaarticulos: string[] = ['Articulo 1', 'Articulo 2', 'Articulo 3', 'Articulo 4', 'Articulo 5', 'Articulo 6', 'Articulo 5', 'Articulo 6', 'Articulo 7'];
  listacolor: string[] = ['color1', 'color2', 'color3', 'color4'];
  //slider
  value = 0;
  min = 0;
  max = 10000;
  autoTicks = false;
  showTicks = false;
  nombreicon1: string = "down";
  nombreicon2: string = "down";
  nombreicon3: string = "down";
  nombreicon4: string = "down";
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  //
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;
  //fin slider

  constructor() {
  }

  ngOnInit() {
  }
  mostrarcategoria() {
    if (document.getElementById('categoriafiltro').style.display == 'block') {
      document.getElementById('categoriafiltro').style.display = 'none';
      this.nombreicon1 = "down";
    }
    else {
      document.getElementById('categoriafiltro').style.display = 'block';
      this.nombreicon1 = "up";
    }
  }
  mostrarmarca() {
    if (document.getElementById('marcafiltro').style.display == 'block') {
      document.getElementById('marcafiltro').style.display = 'none';
      this.nombreicon2 = "down";
    }
    else {
      document.getElementById('marcafiltro').style.display = 'block';
      this.nombreicon2 = "up";
    }
  }
  mostrarprecio() {
    if (document.getElementById('divprecio').style.display == 'block') {
      document.getElementById('divprecio').style.display = 'none';
      this.nombreicon4 = "down";
    }
    else {
      document.getElementById('divprecio').style.display = 'block';
      this.nombreicon4 = "up";
    }
  }
  mostrarcolor() {
    if (document.getElementById('colorfiltro').style.display == 'block') {
      document.getElementById('colorfiltro').style.display = 'none';
      this.nombreicon3 = "down";
    }
    else {
      document.getElementById('colorfiltro').style.display = 'block';
      this.nombreicon3 = "up";
    }
  }
  cambiarvista1() {
    for (var i = 0; i < this.listaarticulos.length; i++) {
      document.getElementById('contenedorarticulo' + this.listaarticulos[i]).className = ('col-lg-4');
      document.getElementById('colart1' + this.listaarticulos[i]).className = ('col-lg-12');
      document.getElementById('colart2' + this.listaarticulos[i]).className = ('col-lg-12');
    }
  }
  cambiarvista2() {
    for (var i = 0; i < this.listaarticulos.length; i++) {
      document.getElementById('contenedorarticulo' + this.listaarticulos[i]).className = ('col-lg-12');
      document.getElementById('colart1' + this.listaarticulos[i]).className = ('col-lg-4');
      document.getElementById('colart2' + this.listaarticulos[i]).className = ('col-lg-8');
    }
  }
}

