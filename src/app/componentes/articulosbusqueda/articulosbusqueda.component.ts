import { Categoria } from './../menu/categoria';
import { CategoriaService } from './../categoria/categoria.service';
import { MarcaService } from './../marca/marca.service';
import { Marca } from './../marca/marca';
import { ArticuloDetalleService } from './../articulo-detalle/articulo-detalle.service';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Articulo } from './../articulo-detalle/articulo';
import { Constantes } from '../constantes';
import { ActivatedRoute } from "@angular/router";
import { ServicioapoyoService } from '../articulosbusqueda/servicioapoyo.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';//
import * as $ from 'jquery';
import { filter } from 'rxjs/operators';
import { DataRowOutlet } from '@angular/cdk/table';


@Component({
  selector: 'app-articulosbusqueda',
  templateUrl: './articulosbusqueda.component.html',
  styleUrls: ['./articulosbusqueda.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticulosbusquedaComponent implements OnInit {
  numeroencontrados:number=0;
  articuloslista: any;
  temporallistaarti: any;
  temparticuloslista: any;
  //URL_IMAGENES = Constantes.URL_API_IMAGEN;
  URL_IMAGENES = Constantes.URL_IMAGEN;
  tempomarcas: any;
  arreglomarcas: string[]; //= new Array();

  selected = 'option1';
  listacategorias: string[] = ['Todos', 'Equipos más pedidos', 'Nuevos Lanzamientos', 'Equipos 4.5G', 'Equipos Premiun'];
  listamarcas: any;
  listamarcas2: string[];//any = [{ id: any, nombre: string }];
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
    document.getElementById('noencontrado').hidden=true;
    //location.reload();
    // this.articuloslista="";
    // console.log(screen.width);
    // this.cambiaridfiltro();
    // this.openSnackBar();
    this.listarmarcasfiltro();
    var url = this.route.snapshot.paramMap.get("pclave");
    this.listaraarticulos(url);
    //this. vistanoencontrado();

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
  vistanoencontrado(){
    if(this.temporallistaarti== null || this.temporallistaarti == ""){
      document.getElementById('contenedorbusqueda').hidden=true;
      document.getElementById('noencontrado').hidden=false;
    }
  }
  listarmarcasfiltro() {
    this.marcaservice.listarmarcasT()
      .subscribe(res => {
        this.marcaservice.marca = res as Marca[];
        var resp = JSON.parse(JSON.stringify(res));
        this.tempomarcas = resp;
      });
  }
  buscararticulos(datobusq:string){
    var Resul;
    //Resul=this.listaarticulos(datobusq);
  }
  listaraarticulos(pclave: string) {
    this.articulodetalleService.listarArticulos(pclave)
      .subscribe(res => {
        this.articulodetalleService.Articulo = res as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(res));
        if (Respuesta != "") {
          this.articuloslista = Respuesta;
          this.numeroencontrados=Object.keys(res).length;
          this.temporallistaarti = Respuesta;
      //    return Respuesta;
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
          this.numeroencontrados=Object.keys(res).length;
          this.temporallistaarti = Respuesta;
          console.log('Marca'+this.temporallistaarti);
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
        this.numeroencontrados=Object.keys(res).length;
        this.temporallistaarti = Respuesta;
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
  recuperarprecio(palbus:String){
    
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
   //filtro marca
  filtroMarca() {
    var arr = [];
    $("input:checkbox[name=check]:checked").each(function () {
      arr.push($(this).val());
    });
    this.agregararreglo(arr);
    this.verarr();
  }
  agregararreglo(dat: string[]) {
    this.arreglomarcas = dat;
  }
  verarr() {
    var articuloslista2=new Array();
    var tempArr=this.temporallistaarti as any[];
    for(var j=0;j<this.arreglomarcas.length;j++){
      for (var i = 0; i < Object.keys(this.temporallistaarti).length; i++) {
        console.log(i);
        if (tempArr[i].marca == this.arreglomarcas[j]) {
          articuloslista2.push(tempArr[i]);
        }
      }
    }
    this.articuloslista= articuloslista2;
  }
  //fin filtro marca
}


