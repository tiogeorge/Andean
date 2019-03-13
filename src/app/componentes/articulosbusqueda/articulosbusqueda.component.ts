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
import { Options, ChangeContext, PointerType } from 'ng5-slider';
import { filter } from 'rxjs/operators';
import { DataRowOutlet } from '@angular/cdk/table';
import { IfStmt } from '@angular/compiler';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-articulosbusqueda',
  templateUrl: './articulosbusqueda.component.html',
  styleUrls: ['./articulosbusqueda.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticulosbusquedaComponent implements OnInit {
  //range slider
  minValue: number = 0;
  maxValue: number = 20000;
  options: Options = {
    floor: 0,
    ceil: 20000
  };
  logText: string = '';
  //fin slider

  linea: string;
  tipo: string;
  cuota: string;
  tipordenado: string;
  // selected2 = 'alta';
  // selected3 = '0';
  palabrabusq: string;
  categoriabus:string;
  numeroencontrados: number = 0;
  articuloslista: any;
  temporallistaarti: any;
  temporallistaarti2: any;
  arreglotempo = Array();
  //URL_IMAGENES = Constantes.URL_API_IMAGEN;
  URL_IMAGENES = Constantes.URL_IMAGEN;
  tempomarcas: any;
  tempocategoria: any;
  arreglomarcas: string[]; //= new Array();

  selected = 'option1';
  listacategorias: any;
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
  valueejem = 0;
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
  //range slider
  onUserChangeStart(changeContext: ChangeContext): void {
    this.logText += `onUserChangeStart(${this.getChangeContextString(changeContext)})\n`;
    console.log('start');
  }

  onUserChange(changeContext: ChangeContext): void {
    this.logText += `onUserChange(${this.getChangeContextString(changeContext)})\n`;
    console.log('medio');

  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
    console.log('fin');
    this.filtrarprecios();

  }
  //extraer datos que estan en el rango de precios
  filtrarprecios() {
    this.arreglotempo = [];
    // this.temporallistaarti2=this.temporallistaarti;
    /* for (var i = 0; i < Object.keys(this.temporallistaarti).length; i++) {
       if ((Number(this.temporallistaarti[i].precioplan.precio) > this.minValue) && (Number(this.temporallistaarti[i].precioplan.precio) < this.maxValue)) {
         this.arreglotempo.push(this.temporallistaarti[i]);
       }
     }*/
    for (var i = 0; i < Object.keys(this.temporallistaarti2).length; i++) {
      if ((Number(this.temporallistaarti2[i].precioplan.precio) > this.minValue) && (Number(this.temporallistaarti2[i].precioplan.precio) < this.maxValue)) {
        this.arreglotempo.push(this.temporallistaarti2[i]);
      }
    }
    this.funcionArreglo();
    console.log(this.arreglotempo);
    //this.articuloslista=this.articuloslista.find(myObj => myObj._id === this.arreglotempo[0]);
  }
  funcionArreglo() {
    var arreglotem2: any = this.arreglotempo;
    this.articuloslista = arreglotem2;
    this.numeroencontrados = Object.keys(this.articuloslista).length;
  }
  //

  getChangeContextString(changeContext: ChangeContext): string {
    return `{pointerType: ${changeContext.pointerType === PointerType.Min ? 'Min' : 'Max'}, ` +
      `value: ${changeContext.value}, ` +
      `highValue: ${changeContext.highValue}}`;
  }
  //fin slider
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(value) {
    this._tickInterval = coerceNumberProperty(value);
  }
  private _tickInterval = 1;
  //fin slider

  palabraClave: any;
  subscription: Subscription;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private route: ActivatedRoute, private articulodetalleService: ArticuloDetalleService, private marcaservice: MarcaService, private categoriaservice: CategoriaService, private servicioapoyo: ServicioapoyoService) {
    this.subscription = this.servicioapoyo.getPalabraClave()
      .subscribe(clave => {
        this.palabraClave = clave.clave;
        console.log("LLEGO DEL MENU :" + this.palabraClave);
        this.listaraarticulos(this.palabraClave)
      })
  }

  ngOnInit() {
    document.getElementById('selectplan').hidden = true;
    document.getElementById('selectcuotas').hidden = true;
    document.getElementById('noencontrado').hidden = true;
    // document.getElementById('precio2').style.display='none';
    //location.reload();
    // this.articuloslista="";
    // console.log(screen.width);
    //this.cambiaridfiltro();
    // this.openSnackBar();
    this.listarmarcasfiltro();
    //this.listarcategoriafiltro();
    this.linea = 'PREPAGO';
    this.tipo = 'ALTA';
    this.cuota = '0';
    this.tipordenado = 'orden1';
    var urlcat=this.route.snapshot.paramMap.get("tipobus");
    var url = this.route.snapshot.paramMap.get("pclave");
    if(urlcat=='Cat'){
      this.listararticate(url);
    }
    else{
      this.listaraarticulos(url);
    }
    this.palabrabusq = url;
    this.palabraClave = url;
    //this. vistanoencontrado();

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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

    //  if (screen.width < 767) {
    document.getElementById('categoriafiltro2').id = ('categoriafiltro');
    document.getElementById('categoriafiltro').id = ('categoriafiltro2');
    document.getElementById('marcafiltro2').id = ('marcafiltro');
    document.getElementById('marcafiltro').id = ('marcafiltro2');
    document.getElementById('divprecio2').id = ('divprecio');
    document.getElementById('divprecio').id = ('divprecio2');
    //   document.getElementById('colorfiltro2').id = ('colorfiltro');
    //   document.getElementById('colorfiltro').id = ('colorfiltro2');
    // document.getElementById('sliderpre').style.width = ('95%');
    // }
  }
  //funciones
  vistanoencontrado() {
    //if (this.estadobusqueda=='no') {
    document.getElementById('contenedorbusqueda').hidden = true;
    document.getElementById('noencontrado').hidden = false;
    // }
  }
  listarmarcasfiltro() {
    this.marcaservice.listarmarcasT()
      .subscribe(res => {
        this.marcaservice.marca = res as Marca[];
        var resp = JSON.parse(JSON.stringify(res));
        this.tempomarcas = resp;
      });
  }
  listarcategoriafiltro() {
    this.categoriaservice.listarcategoriasT()
      .subscribe(res => {
        this.categoriaservice.categoria = res as Categoria[];
        var respuesta = JSON.parse(JSON.stringify(res));
        this.tempocategoria = respuesta;
      });
  }
  listcategoraisfil() {
    var tem = this.articuloslista;
    var temp: any[] = new Array();
    for (var i = 0; i < Object.keys(tem).length; i++) {
      //temp.push(tem[i].categoria);
      temp[i] = tem[i].categoria;
    }
    console.log(temp);
    this.funcionrepetir(temp);
  }

  //contar repetidos
  funcionrepetir(tem: any[]) {
    console.log(tem)
    var ArrOrdenado = [],
      norepetidos = [],
      count = 1;
    ArrOrdenado = tem.sort(function (a, b) {
      return a - b
    });
    console.log('ordenado');
    console.log(ArrOrdenado);
    for (var i = 0; i < ArrOrdenado.length; i = i + count) {
      count = 1;
      for (var j = i + 1; j < ArrOrdenado.length; j++) {
        if (ArrOrdenado[i] === ArrOrdenado[j])
          count++;
      }
      console.log(ArrOrdenado[i] + " = " + count);
      norepetidos[i] = ArrOrdenado[i];
    }
    console.log(norepetidos);
    this.recuperarpadres(norepetidos);
  }
  recuperarpadres(tem: any[]) {
    var padres = [];
    for (var i = 0; i < tem.length; i++) {
      this.categoriaservice.listarpadressegunhijo(tem[i])
        .subscribe(res => {
          padres.push(JSON.parse(JSON.stringify(res)));
        });
    }
    console.log('los padres son');
    console.log(padres);
    this.listacategorias = padres;
    console.log(this.listacategorias);
  }
  //fin

  listararticate(id:string){
    document.getElementById('contenedorbusqueda').hidden = false;
    document.getElementById('noencontrado').hidden = true;
    this.articuloslista = new Array();
    this.articulodetalleService.listarArticulo4(id, this.linea, this.tipo, this.cuota)
    .subscribe(res => {
      this.articulodetalleService.Articulo = res as Articulo[];
      var Respuesta = JSON.parse(JSON.stringify(res));
        this.articuloslista = Respuesta;
        this.numeroencontrados = Object.keys(res).length;
        this.temporallistaarti = Respuesta;
        this.temporallistaarti2 = Respuesta;
        this.listcategoraisfil();
    });
  }
  listaraarticulos(pclave: string) {
    document.getElementById('contenedorbusqueda').hidden = false;
    document.getElementById('noencontrado').hidden = true;
    this.articuloslista = new Array();
    this.articulodetalleService.listarArticulos(pclave, this.linea, this.tipo, this.cuota)
      .subscribe(res => {
        this.articulodetalleService.Articulo = res as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(res));
        if (Respuesta != "") {
          this.articuloslista = Respuesta;
          this.numeroencontrados = Object.keys(res).length;
          this.temporallistaarti = Respuesta;
          this.temporallistaarti2 = Respuesta;
          this.listcategoraisfil();
        }
        else {
          this.temprecuperarmarcas(pclave);
          // this.temprecuperarcategorias(pclave);
        }
      });
  }
  listaraarticulos2(pclave: string) {
    //  if (pclave != null || pclave != "" || pclave != undefined) {
    this.articulodetalleService.listarArticulos2(pclave, this.linea, this.tipo, this.cuota)
      .subscribe(res => {
        this.articulodetalleService.Articulo = res as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(res));
        console.log(Respuesta);
        this.articuloslista = Respuesta;
        this.numeroencontrados = Object.keys(res).length;
        this.temporallistaarti = Respuesta;
        this.temporallistaarti2 = Respuesta;
        this.listcategoraisfil();
        console.log('Marca' + this.temporallistaarti);
      });
    // }
    // else {
    //  this.temprecuperarcategorias(pclave);
    // }
  }
  listararticulos3(pclave: string) {
    this.articulodetalleService.listarArticulo3(pclave, this.linea, this.tipo, this.cuota)
      .subscribe(res => {
        console.log('entra categoria');
        this.articulodetalleService.Articulo = res as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(res));
        console.log('DATOSSSS');
        console.log(Respuesta);
        this.articuloslista = Respuesta;
        this.numeroencontrados = Object.keys(res).length;
        this.temporallistaarti = Respuesta;
        this.temporallistaarti2 = Respuesta;
      });
  }
  temprecuperarmarcas(pclave2: string) {
    this.marcaservice.listarMarcas(pclave2)
      .subscribe(res => {
        this.marcaservice.marca = res as Marca[];
        var Respuesta2 = JSON.parse(JSON.stringify(res));
        if (Respuesta2 != '') {
          for (var i = 0; i < Object.keys(res).length; i++) {
            this.listaraarticulos2(Respuesta2[i]._id);
            console.log(Respuesta2[i]._id);
          }
        }
        else {
          console.log('entra 1');
          this.temprecuperarcategorias(pclave2);
        }
      })
  }
  temprecuperarcategorias(pclave3: string) {
    console.log('entra 2');
    this.categoriaservice.listarcategoria(pclave3)
      .subscribe(res => {
        this.categoriaservice.categoria = res as Categoria[];
        var Respuesta3 = JSON.parse(JSON.stringify(res));
        if (Respuesta3 != '') {
          for (var i = 0; i < Object.keys(res).length; i++) {
            this.listararticulos3(Respuesta3[i]._id);
          }
        }
        else {
          this.vistanoencontrado();
        }
      })
  }
  recuperarprecio(palbus: String) {

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
    console.log('entra filtro marca');
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
    if (this.arreglomarcas.length > 0) {
      var articuloslista2 = new Array();
      var tempArr = this.temporallistaarti as any[];
      for (var j = 0; j < this.arreglomarcas.length; j++) {
        for (var i = 0; i < Object.keys(this.temporallistaarti).length; i++) {
          console.log(i);
          if (tempArr[i].marca == this.arreglomarcas[j]) {
            console.log(tempArr[i].marca == this.arreglomarcas[j]);
            articuloslista2.push(tempArr[i]);
          }
        }
      }
      this.articuloslista = articuloslista2;
      this.temporallistaarti2 = this.articuloslista;
      this.numeroencontrados = Object.keys(this.articuloslista).length;
    }
    else {
      this.articuloslista = this.temporallistaarti;
      this.temporallistaarti2 = this.temporallistaarti;
      this.numeroencontrados = Object.keys(this.articuloslista).length;
    }
  }
  //fin filtro marca
  //cambiar precio
  mostrartipoplan() {
    document.getElementById('precio1').hidden = true;
    if (this.linea == 'POSTPAGO') {
      document.getElementById('selectplan').hidden = false;
      document.getElementById('selectcuotas').hidden = false;
      this.tipo = 'ALTA';//malena fernandes 76729209
      this.cambiarprecio();
      this.cambiarvistaprecio();
      /*   if ((this.cuota == '12') || (this.cuota == '18')) {
           document.getElementById('precio1').hidden = true;
           document.getElementById('precio2').hidden = false;
         }
         else {
           document.getElementById('precio1').hidden = false;
           document.getElementById('precio2').hidden = true;
         }*/
    }
    else {
      document.getElementById('selectplan').hidden = true;
      document.getElementById('selectcuotas').hidden = true;
      this.linea = 'PREPAGO';
      this.tipo = 'ALTA';
      this.cambiarprecio();
      this.cambiarvistaprecio();
      /*    document.getElementById('precio1').hidden = false;
          document.getElementById('precio2').hidden = true;*/
    }
  }
  cambiarvistaprecio() {
    if ((this.cuota == '12') || (this.cuota == '18')) {
      console.log('cambiar vista');
      document.getElementById('precio1').style.display = 'none';
      document.getElementById('precio2').style.display = 'block';
    }
    else {
      console.log('no cambiar vista');
      document.getElementById('precio2').style.display = 'none';
      document.getElementById('precio1').style.display = 'block';
    }
  }
  cambiarprecio() {
    this.listaraarticulos(this.palabrabusq);
  }
  //fin cambiar precio
  //ordenar
  ordenarlista() {
    if (this.tipordenado == 'orden1') {
      console.log('entra1');
      this.articuloslista.sort();
    }
    if (this.tipordenado == 'orden2') {
      this.articuloslista.sort(function (a, b) { return b.precioplan.precio - a.precioplan.precio });
    }
    if (this.tipordenado == 'orden3') {
      this.articuloslista.sort(function (a, b) { return a.precioplan.precio - b.precioplan.precio });
    }
    //console.log(this.articuloslista.sort(function(a,b){return b.titulo - a.titulo}));

  }
  //fin ordenar   //"5c55baea18017021a05c7021",
}

function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}




