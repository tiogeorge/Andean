import { Respuesta } from './../perfil-usuario/respuesta';
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
import { comunicacionService } from '../comunicacion.service';


@Component({
  selector: 'app-articulosbusqueda',
  templateUrl: './articulosbusqueda.component.html',
  styleUrls: ['./articulosbusqueda.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ArticulosbusquedaComponent implements OnInit {
  // RESULTADOS BUSQUEDA
  totalResultados = 0;
  numeroPaginas = 0;
  arrayPaginacion = new Array();
  paginaSeleccionada : number = 1;
  izquierda = new Array();
  derecha = new Array();
  opcionBusqueda : any = "palclv";


  //range slider
  minValue: number = 0;
  maxValue: number = 5000;
  options: Options = {
    floor: 0,
    ceil: 5000
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
  categoriabus: string;
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
  arreglocategorias: string[];
  arreglocategoriasP: string[];

  mostrarBuscando = false;

  selected = 'option1';
  listacategorias = new Array();
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
  }

  onUserChange(changeContext: ChangeContext): void {
    this.logText += `onUserChange(${this.getChangeContextString(changeContext)})\n`;

  }

  onUserChangeEnd(changeContext: ChangeContext): void {
    this.logText += `onUserChangeEnd(${this.getChangeContextString(changeContext)})\n`;
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
  subscriptioncat: Subscription;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private route: ActivatedRoute, private articulodetalleService: ArticuloDetalleService, private marcaservice: MarcaService, private categoriaservice: CategoriaService, private servicioapoyo: ServicioapoyoService, public comService: comunicacionService) {
    this.subscription = this.servicioapoyo.getPalabraClave()
      .subscribe(clave => {
        this.mostrarBuscando = true;
        this.palabraClave = clave.clave;
        this.opcionBusqueda = "palclav";
        this.listaraarticulos(this.palabraClave,1);
        
      });
      this.subscriptioncat = this.comService.getCategoria().subscribe(id=>{
        this.mostrarBuscando = true;
        this.listararticate(id,1);
        this.opcionBusqueda = "cat";
      });

  }

  ngOnInit() {
    document.getElementById('selectplan').hidden = true;
    document.getElementById('selectcuotas').hidden = true;
    document.getElementById('noencontrado').hidden = true;
    // document.getElementById('precio2').style.display='none';
    //location.reload();
    // this.articuloslista="";
    //this.cambiaridfiltro();
    // this.openSnackBar();
    this.listarmarcasfiltro();
    //this.listarcategoriafiltro();
    this.linea = 'PREPAGO';
    this.tipo = 'ALTA';
    this.cuota = '0';
    this.tipordenado = 'orden1';
    var urlcat = this.route.snapshot.paramMap.get("tipobus");
    this.opcionBusqueda = urlcat;
    var url = this.route.snapshot.paramMap.get("pclave");
    this.palabraClave = url;
    var pagina = this.route.snapshot.paramMap.get("page");
    this.paginaSeleccionada = parseInt(pagina);
    this.mostrarBuscando = true;
    if (urlcat == 'cat') {
      //console.log("pagin:"+pagina)
      this.listararticate(url, pagina);
    }
    else {
      if (urlcat == 'palclav') {
        this.listaraarticulos(url,pagina);
      } else {
        //busqueda por banner
        if(urlcat == 'marca'){
          this.listaraarticulos2(url, pagina);
        }else{
          this.buscarporBanner(url, pagina);
        }
        
      }
    }
    this.palabrabusq = url;
    this.palabraClave = url;
    //this. vistanoencontrado();
  }
  // Calcular Paginacion
  calcularPaginacion(){    
    if(this.paginaSeleccionada<=this.numeroPaginas){
      var izquierda = new Array();var derecha = new Array();
      var faltaizquierda = 0; var faltaderecha = 0;
      for(var i = -2 ;i<=2;i++){
        if(i<0){
          if(this.paginaSeleccionada + i <0){faltaizquierda = faltaizquierda+1;}
          else{if(this.paginaSeleccionada + i  != 0){izquierda.push(this.paginaSeleccionada + i);}}
        }else{
          if(i>0){if(this.paginaSeleccionada + i >this.numeroPaginas){faltaderecha = faltaderecha +1;}
          else{derecha.push(this.paginaSeleccionada + i);}}
        }
      }
      console.log("falta izquierda = "+faltaizquierda);
      console.log("falta derecha = "+faltaderecha);
      if(faltaizquierda >0){
        for(var i = 0;i<faltaizquierda;i++){var sgt = derecha[derecha.length-1] as number;if((sgt+1)<=this.numeroPaginas){derecha.push(sgt+1);}}
      }
      if(faltaderecha >0){
        for(var i = 0;i<faltaderecha;i++){var ant = izquierda[0] as number ;if((ant-1)>0){console.log("agregando a izquierda");izquierda.unshift(ant-1);}}
      }
      this.izquierda = izquierda;this.derecha = derecha;
    }else{
      this.izquierda = new Array(); this.derecha = new Array();
    }

    
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
      temp[i] = tem[i].categoriapadre;
    }
    this.funcionrepetir(temp);
  }
  buscarporBanner(idbanner, page) {
    document.getElementById('contenedorbusqueda').hidden = false;
    document.getElementById('noencontrado').hidden = true;
    this.articuloslista = new Array();
    this.articulodetalleService.getArticulosBanner(idbanner,page).subscribe(res => {
      this.mostrarBuscando = false;
      var respuesta1 = res as any;
      this.articulodetalleService.Articulo = respuesta1.articulos as any[];
      this.totalResultados = respuesta1.total;
        this.numeroPaginas = respuesta1.numpaginas;
        this.calcularPaginacion();
      //console.log(res);
      var Respuesta = JSON.parse(JSON.stringify(respuesta1.articulos));
      if (Respuesta != "") {
        this.articuloslista = Respuesta;
        //this.numeroencontrados = Object.keys(respuesta1.articulos).length;
        this.temporallistaarti = Respuesta;
        this.temporallistaarti2 = Respuesta;
        this.listcategoraisfil();
      } else {
        document.getElementById('noencontrado').hidden = false;
        document.getElementById('contenedorbusqueda').hidden = true;
      }
    });
  }

  //contar repetidos
  funcionrepetir(tem: any[]) {
    var ArrOrdenado = [],
      norepetidos = [],
      count = 1;
    ArrOrdenado = tem.sort(function (a, b) {
      return a - b
    });
    for (var i = 0; i < ArrOrdenado.length; i = i + count) {
      count = 1;
      for (var j = i + 1; j < ArrOrdenado.length; j++) {
        if (ArrOrdenado[i] === ArrOrdenado[j])
          count++;
      }
      norepetidos[i] = ArrOrdenado[i];
    }
    for (var j = 0; j < norepetidos.length; j++) {
      this.recuperarcat(norepetidos[j]);
    }
  }
  recuperarcat(id: string) {
    this.categoriaservice.listarhijossegunpadre(id)
      .subscribe(res => {
        var Respuesta = JSON.parse(JSON.stringify(res));
        this.listacategorias.push(Respuesta[0]);
      });
  }
  //fin

  listararticate(id: string, page: any) {
    document.getElementById('contenedorbusqueda').hidden = false;
    document.getElementById('noencontrado').hidden = true;
    this.articuloslista = new Array();
    this.articulodetalleService.listarArticulo4(id, page)
      .subscribe(res => {
        this.mostrarBuscando = false;
        console.log(res);
        var respuesta1 = res as any;
        this.articulodetalleService.Articulo = respuesta1.articulos as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(respuesta1.articulos));
        //console.log(Respuesta);
        this.totalResultados = respuesta1.total;
        this.numeroPaginas = respuesta1.numpaginas;
        this.calcularPaginacion();
        if (Object.keys(respuesta1.articulos).length > 0) {
          if(id=='5c868b24f647673b0c262f4e'){
            Respuesta[0].sort(function (a, b) { return b.puntuacion - a.puntuacion });
            this.articuloslista = Respuesta[0];
            //console.log('articulo lista')
            //console.log(this.articuloslista)
            //console.log(this.articuloslista)
            this.numeroencontrados = Object.keys(res).length;
            this.temporallistaarti = Respuesta[0];
            this.temporallistaarti2 = Respuesta[0];
            this.listcategoraisfil();
           // console.log(this.articuloslista);
          }
          else{
            Respuesta.sort(function (a, b) { return b.puntuacion - a.puntuacion });
            this.articuloslista = Respuesta;
            //console.log('articulo lista')
            //console.log(this.articuloslista)
            //console.log(this.articuloslista)
            this.numeroencontrados = Object.keys(res).length;
            this.temporallistaarti = Respuesta;
            this.temporallistaarti2 = Respuesta;
            this.listcategoraisfil();
           // console.log(this.articuloslista);
          }
        }
        else {
          this.palabraClave = '';
          this.vistanoencontrado();
        }
      });
  }
  listaraarticulos(pclave: string, page: any) {
    document.getElementById('contenedorbusqueda').hidden = false;
    document.getElementById('noencontrado').hidden = true;
    this.articuloslista = new Array();
    this.articulodetalleService.listarArticulos(pclave, page)
      .subscribe(res => {
        this.mostrarBuscando = false;
        var respuesta  = res as any;
        console.log(respuesta);
        this.totalResultados = respuesta.total;
        this.numeroPaginas = respuesta.numpaginas;
        this.calcularPaginacion();
        this.articulodetalleService.Articulo = respuesta.articulos as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(respuesta.articulos));
        if (Respuesta != "") {
          Respuesta.sort(function (a, b) { return b.puntuacion - a.puntuacion });
          this.articuloslista = Respuesta;
          this.numeroencontrados = Object.keys(respuesta.articulos).length;
          this.temporallistaarti = Respuesta;
          this.temporallistaarti2 = Respuesta;
          this.listcategoraisfil();
          //console.log(this.articuloslista);
        }
        else {
          this.temprecuperarmarcas(pclave, page);
          // this.temprecuperarcategorias(pclave);
        }
      });
  }
  listaraarticulos2(pclave: string, page: any) {
    //  if (pclave != null || pclave != "" || pclave != undefined) {
    this.articulodetalleService.listarArticulos2(pclave, page)
      .subscribe(res => {
        this.mostrarBuscando = false;
        var respuesta1 = res as any;
        this.articulodetalleService.Articulo = respuesta1.articulos as Articulo[];
        this.totalResultados = respuesta1.total;
        this.numeroPaginas = respuesta1.numpaginas;
        this.calcularPaginacion();
        var Respuesta = JSON.parse(JSON.stringify(respuesta1.articulos));
        Respuesta.sort(function (a, b) { return b.puntuacion - a.puntuacion });
        this.articuloslista = Respuesta;
        //this.numeroencontrados = Object.keys(res).length;
        this.temporallistaarti = Respuesta;
        this.temporallistaarti2 = Respuesta;
        this.listcategoraisfil();
      });
    // }
    // else {
    //  this.temprecuperarcategorias(pclave);
    // }
  }
  listararticulos3(pclave: string, page: any) {
    this.articulodetalleService.listarArticulo3(pclave, page)
      .subscribe(res => {
        this.articulodetalleService.Articulo = res as Articulo[];
        var Respuesta = JSON.parse(JSON.stringify(res));
        Respuesta.sort(function (a, b) { return b.puntuacion - a.puntuacion });
        this.articuloslista = Respuesta;
        this.numeroencontrados = Object.keys(res).length;
        this.temporallistaarti = Respuesta;
        this.temporallistaarti2 = Respuesta;
      });
  }
  temprecuperarmarcas(pclave2: string, page: any) {
    this.marcaservice.listarMarcas(pclave2)
      .subscribe(res => {
        this.marcaservice.marca = res as Marca[];
        var Respuesta2 = JSON.parse(JSON.stringify(res));
        if (Respuesta2 != '') {
          for (var i = 0; i < Object.keys(res).length; i++) {
            this.listaraarticulos2(Respuesta2[i]._id, page);
          }
        }
        else {
          this.temprecuperarcategorias(pclave2, page);
        }
      })
  }
  temprecuperarcategorias(pclave3: string, page : any) {
    this.categoriaservice.listarcategoria(pclave3)
      .subscribe(res => {
        this.categoriaservice.categoria = res as Categoria[];
        var Respuesta3 = JSON.parse(JSON.stringify(res));
        if (Respuesta3 != '') {
          for (var i = 0; i < Object.keys(res).length; i++) {
            this.listararticulos3(Respuesta3[i]._id, page);
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
  filtroCategoria() {
    var arrcat = [];
    $("input:checkbox[name=checkPadre]:checked").each(function () {
      arrcat.push($(this).val());
    });
    this.agregararreglocatP(arrcat);
    this.verarrCatP();
  }
  filtroCategoriaH() {
    var arrcatH = [];
    $("input:checkbox[name=checkHijo]:checked").each(function () {
      arrcatH.push($(this).val());
    });
    this.agregararreglocat(arrcatH);
    this.verarrCatH();
  }
  filtroMarca() {
    var arr = [];
    $("input:checkbox[name=checkMarca]:checked").each(function () {
      arr.push($(this).val());
    });
    this.agregararreglo(arr);
    this.verarrMarca();
  }
  agregararreglo(dat: string[]) {
    this.arreglomarcas = dat;
  }
  agregararreglocatP(dat2: string[]) {
    this.arreglocategoriasP = dat2;
    if(dat2!=[]){
      $("#catehijos input[type=checkbox]").prop('checked', true);
    }
    else{
      $("#catehijos input[type=checkbox]").prop('checked', false);
    }
  }
  agregararreglocat(dat2: string[]) {
    this.arreglocategorias = dat2;
  }
  verarrMarca() {
    if (this.arreglomarcas.length > 0) {
      var articuloslista2 = new Array();
      var tempArr = this.temporallistaarti as any[];
      for (var j = 0; j < this.arreglomarcas.length; j++) {
        for (var i = 0; i < Object.keys(this.temporallistaarti).length; i++) {
          if (tempArr[i].marca == this.arreglomarcas[j]) {
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
  verarrCatP() {
    if (this.arreglocategoriasP.length > 0) {
      var articuloslista3 = new Array();
      var tempArr = this.temporallistaarti as any[];
      for (var j = 0; j < this.arreglocategoriasP.length; j++) {
        for (var i = 0; i < Object.keys(this.temporallistaarti).length; i++) {
          if (tempArr[i].categoriapadre == this.arreglocategoriasP[j]) {
            articuloslista3.push(tempArr[i]);
          }
        }
      }
      this.articuloslista = articuloslista3;
      this.temporallistaarti2 = this.articuloslista;
      this.numeroencontrados = Object.keys(this.articuloslista).length;
    }
    else {
      this.articuloslista = this.temporallistaarti;
      this.temporallistaarti2 = this.temporallistaarti;
      this.numeroencontrados = Object.keys(this.articuloslista).length;
    }
  }
  verarrCatH() {
    if (this.arreglocategorias.length > 0) {
      var articuloslista3 = new Array();
      var tempArr = this.temporallistaarti as any[];
      for (var j = 0; j < this.arreglocategorias.length; j++) {
        for (var i = 0; i < Object.keys(this.temporallistaarti).length; i++) {
          if (tempArr[i].categoria == this.arreglocategorias[j]) {
            articuloslista3.push(tempArr[i]);
          }
        }
      }
      this.articuloslista = articuloslista3;
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
      document.getElementById('precio1').style.display = 'none';
      document.getElementById('precio2').style.display = 'block';
    }
    else {
      document.getElementById('precio2').style.display = 'none';
      document.getElementById('precio1').style.display = 'block';
    }
  }
  cambiarprecio() {
    //this.listaraarticulos(this.palabrabusq);
  }
  //fin cambiar precio
  //ordenar
  ordenarlista() {
    if (this.tipordenado == 'orden1') {
      this.articuloslista.sort(function (a, b) { return b.puntuacion - a.puntuacion });
    }
    if (this.tipordenado == 'orden2') {
      this.articuloslista.sort(function (a, b) { return b.precioplan.precio - a.precioplan.precio });
    }
    if (this.tipordenado == 'orden3') {
      this.articuloslista.sort(function (a, b) { return a.precioplan.precio - b.precioplan.precio });
    }

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




