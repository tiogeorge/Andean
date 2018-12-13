import { ArticuloDetalleService } from './../articulo-detalle/articulo-detalle.service';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Articulo } from './../articulo-detalle/articulo';
import { Constantes } from '../constantes';
import { ActivatedRoute } from "@angular/router";



//filtro marca

//fin filtro
@Component({
  selector: 'app-articulosbusqueda',
  templateUrl: './articulosbusqueda.component.html',
  styleUrls: ['./articulosbusqueda.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticulosbusquedaComponent implements OnInit {
  articuloslista: any;
  URL_IMAGENES = Constantes.URL_API_IMAGEN;

  selected = 'option1';
  listacategorias: string[] = ['Todos', 'Equipos más pedidos', 'Nuevos Lanzamientos', 'Equipos 4.5G', 'Equipos Premiun'];
  listamarcas: string[] = ['Todos', 'Apple', 'Huawei', 'LG', 'Motorola', 'Nokia', 'Samsung', 'ZTE'];
  listaarticulos: string[] = ['Huawei Y5 2018', 'LG V35 ThinQ', 'LG K9', 'LG K11 Plus', 'Samsung Galaxy J2 Pro', 'Lg Q Stylus Plus', 'Motorola Moto E5 Play', 'Samsung Galaxy J6', 'Apple Iphone XS 256GB', 'Apple Iphone XS MAX 512GB', 'Apple XS MAX 64GB', 'Nokia 2.1'];
  listaurls: string[] = ['https://static.claro.com.pe/img/ceq/Huawei_Y5-2018_Frontal_Negro_Postpago.png', 'https://static.claro.com.pe/img/ceq/LG_V35_ThinQ_Frontal_Postpago.png', 'https://static.claro.com.pe/img/ceq/LG_K9_Frontal_Postpago.png', 'https://static.claro.com.pe/img/ceq/LG_K11_Plus_Frontal_Postpago.jpg', 'https://static.claro.com.pe/img/ceq/Samsung_Galaxy_J2_Pro_Frontal_Postpago.png', 'https://static.claro.com.pe/img/ceq/LG_Q_Stylus_Plus_Frontal_Postpago.png', 'https://static.claro.com.pe/img/ceq/Motorola_Moto_E5_Play_Frontal_Postpago.png', 'https://static.claro.com.pe/img/ceq/Samsung_galaxy_J6_Frontal_Postpago.png', 'https://static.claro.com.pe/img/ceq/iPhone_Xs_Frontal_200x350_Postpago.png', 'https://static.claro.com.pe/img/ceq/iPhone_Xs_Max_Frontal_200x350_Postpago.png', 'https://static.claro.com.pe/img/ceq/iPhone_Xs_Max_Frontal_200x350_Postpago.png', 'https://static.claro.com.pe/img/ceq/Frontal200x350_PostPago.png'];
  listacolor: string[] = ['Blanco', 'Rojo', 'Azul', 'Negro'];
  //efecto
  centered = false;
  disabled = false;
  unbounded = true;

  radius: number = 50;
  color: string = 'orange';
  //fin efecto
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

  constructor(private route: ActivatedRoute,private articulodetalleService: ArticuloDetalleService) {

  }

  ngOnInit() {
    console.log(screen.width);
    this.cambiaridfiltro();
    var url = this.route.snapshot.paramMap.get("pclave");
    this.listaraarticulos(url);
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
    for (var i = 0; Object.keys(this.articuloslista).length; i++) {
      document.getElementById('contenedorarticulo' + this.articuloslista[i]._id).className = 'col-lg-3';
      document.getElementById('colart1' + this.articuloslista[i]._id).className = 'col-lg-12 imagar';
      document.getElementById('colart2' + this.articuloslista[i]._id).className = 'col-lg-12';
    }
  }
  cambiarvista2() {
    for (var i = 0; Object.keys(this.articuloslista).length; i++) {
      document.getElementById('contenedorarticulo' + this.articuloslista[i]._id).className = ('col-lg-12');
      document.getElementById('colart1' + this.articuloslista[i]._id).className = ('col-lg-4 imagar');
      document.getElementById('colart2' + this.articuloslista[i]._id).className = ('col-lg-8');
    }
  }
  cambiaridfiltro() {

    if (screen.width < 767) {
      document.getElementById('categoriafiltro2').id = ('categoriafiltro');
      document.getElementById('categoriafiltro').id = ('categoriafiltro2');
      document.getElementById('marcafiltro2').id = ('marcafiltro');
      document.getElementById('marcafiltro').id = ('marcafiltro2');
      document.getElementById('divprecio2').id = ('divprecio');
      document.getElementById('divprecio').id = ('divprecio2');
      document.getElementById('colorfiltro2').id = ('colorfiltro');
      document.getElementById('colorfiltro').id = ('colorfiltro2');
      document.getElementById('sliderpre').style.width = ('95%');
    }
  }
  //funciones
  listaraarticulos(pclave:string) {
    this.articulodetalleService.listarArticulos(pclave)
      .subscribe(res => {
        console.log('entra');
        this.articulodetalleService.Articulo = res as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(res));
        this.articuloslista = Respuesta;
      });
  }
}

