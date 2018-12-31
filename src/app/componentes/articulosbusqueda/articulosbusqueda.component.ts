import { Categoria } from './../menu/categoria';
import { CategoriaService } from './../categoria/categoria.service';
import { MarcaService } from './../marca/marca.service';
import { Marca } from './../marca/marca';
import { ArticuloDetalleService } from './../articulo-detalle/articulo-detalle.service';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit, ViewEncapsulation,AfterViewInit,OnDestroy, ViewChild  } from '@angular/core';
import { Articulo } from './../articulo-detalle/articulo';
import { Constantes } from '../constantes';
import { ActivatedRoute } from "@angular/router";
import { ServicioapoyoService } from '../articulosbusqueda/servicioapoyo.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';//
import { ReplaySubject } from 'rxjs';
import { MatSelect, VERSION } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';



//filtro marca
interface MarcaFiltro {
  id: string;
  nombre: string;
}
//fin filtro
@Component({
  selector: 'app-articulosbusqueda',
  templateUrl: './articulosbusqueda.component.html',
  styleUrls: ['./articulosbusqueda.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticulosbusquedaComponent implements OnInit {
  formcheck: FormGroup;
  articuloslista: any;
  //URL_IMAGENES = Constantes.URL_API_IMAGEN;
  URL_IMAGENES = Constantes.URL_IMAGEN;
  tempomarcas: any;
  marcalistafiltro=new Array;//:MarcaFiltro[];
 
  selected = 'option1';
  listacategorias: string[] = ['Todos', 'Equipos más pedidos', 'Nuevos Lanzamientos', 'Equipos 4.5G', 'Equipos Premiun'];
  listamarcas: any;
  listamarcas2: string[];//any = [{ id: any, nombre: string }];
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

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private route: ActivatedRoute, private articulodetalleService: ArticuloDetalleService, private marcaservice: MarcaService, private categoriaservice: CategoriaService, private servicioapoyo: ServicioapoyoService) {
  }

  ngOnInit() {

    //location.reload();
    // this.articuloslista="";
    // console.log(screen.width);
    // this.cambiaridfiltro();
    // this.openSnackBar();
    this.listarmarcasfiltro();
    var url = this.route.snapshot.paramMap.get("pclave");
    this.listaraarticulos(url);
  }
  openSnackBar() {
    var message = 'Cargando';
    var action = 'c';
    this.snackBar.open(message, action, {
      duration: 10000,
    });
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
  listarmarcasfiltro() {
    this.marcaservice.listarmarcasT()
      .subscribe(res => {
        this.marcaservice.marca = res as Marca[];
        var resp = JSON.parse(JSON.stringify(res));
        this.tempomarcas = resp;
        for(var i=0;i<Object.keys(res).length;i++){
          this.marcalistafiltro.push({id:resp[i]._id,nombre:resp[i].nombremarca});
        }
        console.log(this.marcalistafiltro);
      });
  }
  listaraarticulos(pclave: string) {
    this.articulodetalleService.listarArticulos(pclave)
      .subscribe(res => {
        this.articulodetalleService.Articulo = res as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(res));
        if (Respuesta != "") {
          this.articuloslista = Respuesta;
        }
        else {
          this.temprecuperarmarcas(pclave);
          this.temprecuperarcategorias(pclave);
        }

      });
  }
  listaraarticulos2(pclave: string) {
    if (pclave != null || pclave != "" || pclave != undefined) {
      this.articulodetalleService.listarArticulos2(pclave)
        .subscribe(res => {
          this.articulodetalleService.Articulo = res as Articulo[];
          var Respuesta = JSON.parse(JSON.stringify(res));
          this.articuloslista = Respuesta;
        });
    }
    else {
      this.temprecuperarcategorias(pclave);
    }
  }
  listararticulos3(pclave: string) {
    this.articulodetalleService.listarArticulo3(pclave)
      .subscribe(res => {
        console.log('entra categoria');
        this.articulodetalleService.Articulo = res as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(res));
        this.articuloslista = Respuesta;
      });
  }
  temprecuperarmarcas(pclave2: string) {
    this.marcaservice.listarMarcas(pclave2)
      .subscribe(res => {
        this.marcaservice.marca = res as Marca[];
        var Respuesta2 = JSON.parse(JSON.stringify(res));
        for (var i = 0; i < Object.keys(res).length; i++) {
          this.listaraarticulos2(Respuesta2[i]._id);
          console.log(Respuesta2[i]._id);
        }
      })
  }
  temprecuperarcategorias(pclave3: string) {
    this.categoriaservice.listarcategoria(pclave3)
      .subscribe(res => {
        this.categoriaservice.categoria = res as Categoria[];
        var Respuesta3 = JSON.parse(JSON.stringify(res));
        for (var i = 0; i < Object.keys(res).length; i++) {
          this.listararticulos3(Respuesta3[i]._id);
        }
      })
  }
  /* cambiarhtml(estado: string) {
     if (estado == '0') {
       alert('oculta');
       document.getElementById('contenedorbusqueda').hidden = true;
     }
     if (estado == '1') {
       alert('muestra');
       document.getElementById('contenedorbusqueda').hidden = false;
     }
   }*/
  filtro() {
    /* var divCont = document.getElementById('divcheck');
     var checks = divCont.getElementsByTagName('input');
     console.log(checks.length);
     var id: string[];
     for (var i = 0; i < checks.length; i++) {
       if (checks[i].checked == true) {
         id[i] = checks[i].id;
       }
     }*/
  }
}


