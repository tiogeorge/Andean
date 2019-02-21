import { Router } from '@angular/router';
import { Usuario } from './../perfil-usuario/usuario';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DireccionService } from './direccion.service';
import { Direccion } from './direccion';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Region } from '../perfil-usuario/region';
import { RegionService } from '../perfil-usuario/region.service';
import { PagoService } from './pago.service';
import { ArticuloDetalleService } from '../articulo-detalle/articulo-detalle.service';
import { Articulo } from '../articulo-detalle/articulo';
import { Constantes } from './../constantes';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
const moment = _rollupMoment || _moment;

export interface NombreDirec {
  nombre: string;
}

export interface Años {
  value: string;
  viewValue: string;
}
export interface Mes {
  value: string;
  viewValue: string;
}
export interface Tipolocalenvio {
  value: string;
}

export interface temarti {
  _id: string,
  idarticulo: string;
  titulo: string,
  url: string,
  categoria: string,
  marca: string,
  cantidad: string,
  idprecio: string,
  imagenes: any[],
  cuotainicial: string,
  cuotamensual: string,
  cuotas: string,
  montomes: string,
  nombreplan: string,
  precio: string,
  tipolinea: string,
  tipoplan: string,
}
export interface temdoc {
  Tipo: String,
  Serie: String,
  Numero: String,
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM',
  },
  display: {
    dateInput: 'YYYY/MM',
    monthYearLabel: 'MMM YYYY',
    dateAllyLabel: 'LL',
    monthYearAllylabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [
    { provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}, 
    DireccionService, PagoService],
  encapsulation: ViewEncapsulation.None
})

export class PagoComponent implements OnInit {
  seriedoc: string = "";
  numerodoc: string = "";
  tipodoc: string = "BBV";
  //expansion panel
  panelOpenState = false;
  //fin panel
  //img
  url_imagenes_md = Constantes.URL_IMAGEN_MD;
  //fin img
  listaCarrito: any[];
  listaArticulos: Articulo[] = [];
  tempoarti: Articulo[] = [];
  listaPlanArticulo: any[] = [];
  // listaArticulos2: temarti[] = [];
  listaArticulos2: any[] = [];
  mostrarArticulos: boolean = true;
  sinProductos: boolean = false;
  usuario: Usuario;
  user: string = '';
  correoclient: string = '';
  listdirecciones: string[];
  listtemporaldir: string[];
  localselec = 'Casa';
  RespuestaDir: any;
  logocard: string = '';
  direccionsel: string = '';
  DocumentoT: temdoc[] = [{ Tipo: 'BBV', Serie: '1', Numero: '1' }];
  //montos
  subtotal: string;
  montoenvio: string;
  preciototal: string;
  //stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //fin stepper
  //nombreicondir
  nombreicondir: string = 'add';
  nombreiconselec: string = 'adjust';
  nombreicontipo: string = 'home';
  //finnombre
  //chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  fruits: NombreDirec[] = [
    { nombre: 'Direccion1' },
  ];
  tiposDocumento              : string[];
  date = new FormControl(moment());
  anioHoy = new Date().getFullYear();
  mesHoy = new Date().getMonth();
  minDate : Date;

  //
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({ nombre: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  direccionselec(id: string, nombreicon: string) {
    this.pagoservice.selectPago.idDireccion = id;
    document.getElementsByClassName('matchips').item
    document.getElementById('Resumendir').hidden = false;
    this.logocard = nombreicon;
    //   document.getElementById(id).style.background='#FFBF00';
    //   document.getElementById(id).style.color='white';
    for (var i = 0; i < Object.keys(this.RespuestaDir).length; i++) {
      if (this.RespuestaDir[i]._id == id) {
        //color
        document.getElementById(this.RespuestaDir[i]._id).style.background = '#FFBF00';
        document.getElementById(this.RespuestaDir[i]._id).style.color = 'white';
        //fin
        this.direccionsel = this.RespuestaDir[i].direccion;
        document.getElementById('lbdirec').innerHTML = this.RespuestaDir[i].direccion;
        document.getElementById('lbtipolocal').innerHTML = this.RespuestaDir[i].tipolocal;
        document.getElementById('lbdepartamento').innerHTML = this.RespuestaDir[i].departamento;
        document.getElementById('lbprovincia').innerHTML = this.RespuestaDir[i].provincia;
        document.getElementById('lbdistrito').innerHTML = this.RespuestaDir[i].distrito;
        document.getElementById('lbreferencia').innerHTML = this.RespuestaDir[i].referencia;
        document.getElementById('lbtelefono').innerHTML = this.RespuestaDir[i].telefono;
      }
      else {
        document.getElementById(this.RespuestaDir[i]._id).style.background = '';
        document.getElementById(this.RespuestaDir[i]._id).style.color = 'black';
      }
    }
    this.nombreiconselec = 'check';
    document.getElementById('btnsig1').style.display = 'block';
    document.getElementById('btnsig1').focus();
  }
  remove(fruit: NombreDirec): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  //fin chips
  /* Arti: temarti[] = [
     { idArticulo: '14545454545', PrecioUni: '200', idPlan: '32d3s23ds2d3s' },
   ];*/



  Local: Tipolocalenvio[] = [
    { value: 'Casa' },
    { value: 'Oficina' },
    { value: 'Departamento' },
    { value: 'Edificio' },
    { value: 'Condominio' },
    { value: 'Otro' }

  ];
  Anhos: Años[] = [
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2023' }
  ];
  mes: Mes[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
    { value: '6', viewValue: '6' },
    { value: '7', viewValue: '7' },
    { value: '8', viewValue: '8' },
    { value: '9', viewValue: '9' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' }
  ];

  constructor(public snackBar: MatSnackBar, public _formBuilder: FormBuilder, public direccionService: DireccionService, public pagoservice: PagoService,public usuarioService: UsuarioService,public router: Router,public regionService: RegionService, public articuloDetalleService: ArticuloDetalleService) {
  }

  ngOnInit() {
    // Validar la fecha de expiración de la tarjeta como mínimo al mes siguiente
    if(this.mesHoy == 12){
      this.mesHoy = 1;
      this.anioHoy = this.anioHoy + 1;
    }
    this.minDate = new Date(this.anioHoy, this.mesHoy + 1);
    this.tiposDocumento       = ['DNI'];
    this.localselec = 'Casa';
    //obtener carrito
    this.articuloDetalleService.getCarrito().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      this.listaCarrito = jres.data;
      for (var i = 0; i < this.listaCarrito.length; i++) {
        this.listaArticulos.push(this.listaCarrito[i][0]);
        this.listaPlanArticulo.push(this.listaCarrito[i][1]);
        this.mostrarArticulos = true;
        this.sinProductos = false;
      }
      console.log(this.listaPlanArticulo);
      this.sumarprecios();
      this.insertaraarregloart();
    });
    //precios
    //   
    //stepps
    this.firstFormGroup = this._formBuilder.group({
      datD1: ['', Validators.required],
      datD2: ['', Validators.required],
      datD3: ['', Validators.required],
      datD4: ['', Validators.required],
      datD5: ['', Validators.required],
      datD6: ['', Validators.required],
      datD7: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      datoN1: ['', Validators.required],
      datoN2: ['', Validators.required],
      datoN3: ['', Validators.required],
      datoN4: ['', Validators.required],
      datoN5: ['', Validators.required],
    });
    //fin stepps
    //recuperar usuario
    this.usuarioService.getUsuarioLogeado().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status) {
        this.usuarioService.usuarioSeleccionado = jres.data  as Usuario;
        this.usuario = jres.data as Usuario;
        this.user = this.usuario._id;
        this.correoclient = this.usuario.correo;
        this.direccionService.selecDireccion.usuario = this.usuario._id;
        this.ListarDireccion(this.usuario._id.toString());
        this.regionService.getRegiones().subscribe(res => {
          this.regionService.regiones = res as Region[];
        })
      } else {
        this.router.navigate(['/registro']);
      }
    });
    //fin recuperar
  }

  mostrarform(value: string) {
    console.log(value);
    if (value == '1') {
      if (document.getElementById('datostarjeta').hidden == true) {
        document.getElementById('datostarjeta').hidden = false;
        document.getElementById('btnsig2').style.display = 'block';
        this.pagoservice.selectPago.idTipoPago = 'tarjeta';
      }
      else {
        document.getElementById('datostarjeta').hidden = true;
      }
    }
    if (value == '2') {
      document.getElementById('datostarjeta').hidden = true;
      this.pagoservice.selectPago.idTipoPago = 'efectivo';
      document.getElementById('btnsig2').style.display = 'block';
    }
    if (value == '3') {
      document.getElementById('datostarjeta').hidden = true;
      this.pagoservice.selectPago.idTipoPago = 'deposito';
      document.getElementById('btnsig2').style.display = 'block';
    }

  }
  mostrarformdir() {
    if (document.getElementById('Agregardireccion').hidden == true) {
      document.getElementById('Agregardireccion').hidden = false;
      this.nombreicondir = 'arrow_drop_down';
    }
    else {
      document.getElementById('Agregardireccion').hidden = true;
      this.nombreicondir = 'add';
    }
  }

  //funciones
  sumarprecios() {
    console.log('entra');
    var sum = 0;
    for (var j = 0; j < this.listaPlanArticulo.length; j++) {
      sum = sum + Number(this.listaPlanArticulo[j].precio);
      console.log('suma' + sum.toString());
    }
    this.subtotal = sum.toString();
    this.montoenvio = '10';
    this.preciototal = (Number(this.subtotal) + Number(this.montoenvio)).toString();
  }
  //insertar articulos en el export 
  /*
   Arti:  temarti[]=[
    {idArticulo:'14545454545', PrecioUni:'200',idPlan:'32d3s23ds2d3s'},
  ];
  */
  insertaraarregloart() {
    //   this.tempoarti=this.listaArticulos;
    //   console.log('_id:'+this.tempoarti[0]._id);
    this.listaArticulos2 = this.listaArticulos;
    for (var i = 0; i < this.listaArticulos.length; i++) {
      // this.listaArticulos2[i].push(this.listaPlanArticulo[i]);
      /*   console.log(this.tempoarti[i]._id)
         this.listaArticulos2[i]._id=this.tempoarti[i]._id;
         this.listaArticulos2[i].imagenes=this.tempoarti[i].imagenes;
         this.listaArticulos2[i].idarticulo=this.tempoarti[i].idarticulo;
         this.listaArticulos2[i].titulo=this.tempoarti[i].titulo;
         this.listaArticulos2[i].url=this.tempoarti[i].url;
         this.listaArticulos2[i].categoria=this.tempoarti[i].categoria;
         this.listaArticulos2[i].idprecio=this.tempoarti[i].idprecio;
         this.listaArticulos2[i].marca=this.tempoarti[i].marca;
         this.listaArticulos2[i].cantidad=this.tempoarti[i].cantidad.toString();*/
      this.listaArticulos2[i].cuotainicial = this.listaPlanArticulo[i].cuotainicial;
      this.listaArticulos2[i].cuotamensual = this.listaPlanArticulo[i].cuotamensual;
      this.listaArticulos2[i].cuotas = this.listaPlanArticulo[i].cuotas;
      this.listaArticulos2[i].montomes = this.listaPlanArticulo[i].montomes;
      this.listaArticulos2[i].nombreplan = this.listaPlanArticulo[i].nombreplan;
      this.listaArticulos2[i].precio = this.listaPlanArticulo[i].precio;
      this.listaArticulos2[i].tipolinea = this.listaPlanArticulo[i].tipolinea;
      this.listaArticulos2[i].tipoplan = this.listaPlanArticulo[i].tipoplan;


    }
    /*  console.log('lista de articulo del carrito');
      console.log(this.listaArticulos2);*/
  }
  //
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.direccionService.selecDireccion = new Direccion();
    }
  }

  AgregarDireccion(form: NgForm) {
    /*this.listdirecciones = JSON.parse(JSON.stringify(this.direccionService.selecDireccion));
    console.log('direccion:');
    console.log(this.listdirecciones);*/
    var rres;
    // this.direccionService.selecDireccion.tipolocal=this.localselec;
    this.direccionService.AgregarDireccion(this.direccionService.selecDireccion)
      .subscribe(res => {
        console.log(res);
        rres = JSON.parse(JSON.stringify(res));
        /* resumedir*/
        document.getElementById('lbdirec').innerHTML = this.direccionService.selecDireccion.direccion;
        document.getElementById('lbtipolocal').innerHTML = this.direccionService.selecDireccion.tipolocal;
        document.getElementById('lbdepartamento').innerHTML = this.direccionService.selecDireccion.departamento;
        document.getElementById('lbprovincia').innerHTML = this.direccionService.selecDireccion.provincia;
        document.getElementById('lbdistrito').innerHTML = this.direccionService.selecDireccion.distrito;
        document.getElementById('lbreferencia').innerHTML = this.direccionService.selecDireccion.referencia;
        document.getElementById('lbtelefono').innerHTML = this.direccionService.selecDireccion.telefono;
        this.nombreiconresdir(this.direccionService.selecDireccion.tipolocal);
        this.direccionsel = this.direccionService.selecDireccion.direccion;
        /*fin */
        this.resetForm(form);
        this.recuperariddirec(rres.data._id, rres.data.tipolocal);
        console.log('Direccion Agregada')
        this.ListarDireccion(this.usuario._id);
      });
    document.getElementById('Agregardireccion').hidden = true;
    document.getElementById('Resumendir').hidden = false;
  }
  nombreiconresdir(nombreicon: string) {
    if (nombreicon == 'Casa') {
      this.logocard = 'home';
    }
    if (nombreicon == 'Oficina') {
      this.logocard = 'business_center';
    }
    if (nombreicon == 'Departamento') {
      this.logocard = 'store_mall_directory';
    }
    if (nombreicon == 'Edificio') {
      this.logocard = 'domain';
    }
    if (nombreicon == 'Condominio') {
      this.logocard = 'location_city ';
    }
    if (nombreicon == 'Otro') {
      this.logocard = 'landscape';
    }
  }
  recuperariddirec(id: string, tiplocal: string) {
    //nombreiconresdir
    this.nombreiconresdir(tiplocal);
    this.direccionselec(id, this.logocard);
  }
  ListarDireccion(id: string) {
    this.direccionService.ListarDireccion(id)
      .subscribe(res => {
        //
        var Respuesta = JSON.parse(JSON.stringify(res));
        for (var i = 0; i < Object.keys(res).length; i++) {
          /* this.Fnombreicondirec(Respuesta[i].tipolocal);
           console.log(Respuesta[i].tipolocal);*/
          if (Respuesta[i].tipolocal == 'Casa') {
            Respuesta[i].nombreicon = 'home';
          }
          if (Respuesta[i].tipolocal == 'Oficina') {
            Respuesta[i].nombreicon = 'business_center';
          }
          if (Respuesta[i].tipolocal == 'Departamento') {
            Respuesta[i].nombreicon = 'store_mall_directory';
          }
          if (Respuesta[i].tipolocal == 'Edificio') {
            Respuesta[i].nombreicon = 'domain';
          }
          if (Respuesta[i].tipolocal == 'Condominio') {
            Respuesta[i].nombreicon = 'location_city ';
          }
          if (Respuesta[i].tipolocal == 'Otro') {
            Respuesta[i].nombreicon = 'landscape';
          }
        }
        this.direccionService.direccion = Respuesta as Direccion[];
        this.RespuestaDir = Respuesta;
        this.listtemporaldir = Respuesta// JSON.parse(JSON.stringify(res));
        console.log(this.RespuestaDir);
      });
  }

  departamentoSelected(departamento: string) {
    var i = 0;
    while (this.regionService.regiones[i].departamento != departamento) { i++; }
    this.regionService.departamentoSelected = this.regionService.regiones[i];
  }

  provinciaSelected(provincia: string) {
    var i = 0;
    while (this.regionService.departamentoSelected.provincias[i].provincia != provincia) { i++; }
    this.regionService.provinciaSelected = this.regionService.departamentoSelected.provincias[i];
  }

  finalizarcompra() {
    //this.guardarventa();
  }

  guardarventa() {
    /*recuperar datos doc */
    this.DocumentoT[0].Tipo = this.tipodoc;
    console.log('serie');
    this.pagoservice.recuperarserie()
      .subscribe(res => {
        console.log(res);
        this.seriedoc = JSON.parse(JSON.stringify(res));
        this.DocumentoT[0].Serie = this.seriedoc;
        console.log(this.seriedoc);
        console.log('numero');
        this.pagoservice.recuperarnumerodoc()
          .subscribe(res => {
            console.log(res);
            this.numerodoc = (Number(JSON.parse(JSON.stringify(res))) + 1).toString();
            this.DocumentoT[0].Numero = this.numerodoc;
            console.log(this.numerodoc);
            //
            this.pagoservice.selectPago.idUsuario = this.user;
            this.pagoservice.selectPago.Correocliente = this.correoclient;
            this.pagoservice.selectPago.Articulo = this.listaArticulos2;
            this.pagoservice.selectPago.FechaCompra = new Date();//new Date(2019, 1, 17);
            this.pagoservice.selectPago.idTipoPago = 'tarjeta';
            this.pagoservice.selectPago.EstadoPago = 'Pagado';
            this.pagoservice.selectPago.Mensaje = 'mensaje ejemplo';
            this.pagoservice.selectPago.EstadoEnvio = 'Proceso';
            this.pagoservice.selectPago.FechaEnvio = new Date();
            this.pagoservice.selectPago.FechaEntrega = new Date();
            this.pagoservice.selectPago.PrecioTotal = this.preciototal;
            this.pagoservice.selectPago.NroTransaccion = '2323232';
            this.pagoservice.selectPago.Documento = this.DocumentoT;
            console.log('documento actua');
            console.log(this.pagoservice.selectPago.Documento);
            this.pagoservice.selectPago.idVendedor = 'ROOT';
            //console.log(this.pagoservice.selectPago.FechaEntrega);
            this.pagoservice.GuardarPago(this.pagoservice.selectPago)
              .subscribe(res => {
                console.log(res);
                if (JSON.parse(JSON.stringify(res)).mensaje == 'ok') {
                  this.snackBar.open('Venta Realizada', '🧓🏻', {
                    duration: 2000,
                  });
                 /* this.eliminarcarrito();
                  this.router.navigateByUrl('home');*/
                }
                else {
                  alert('Error!!!');
                }
              });
            //
          });
        // this.seriedoc=JSON.parse(JSON.stringify(res));

      });

    // this.asignardocumentoventa();
    /* fin */

  }
  eliminarcarrito() {
    this.usuarioService.eliminarArticulosCarrito()
      .subscribe(res => {
        console.log(res);
      });
  }

  asignardocumentoventa() {
    this.recuperarserie();
    this.recuperarnumero();
    this.DocumentoT[0].Tipo = this.tipodoc;
    console.log('documentos');
    console.log(this.DocumentoT);
    this.pagoservice.selectPago.Documento = this.DocumentoT;
    console.log(this.pagoservice.selectPago.Documento);
  }

  recuperarserie() {
    console.log('serie');
    this.pagoservice.recuperarserie()
      .subscribe(res => {
        // this.seriedoc=JSON.parse(JSON.stringify(res));
        console.log(res);
        this.seriedoc = JSON.parse(JSON.stringify(res));
        this.DocumentoT[0].Serie = this.seriedoc;
        console.log(this.seriedoc);
      });
  }

  recuperarnumero() {
    this.pagoservice.recuperarnumerodoc()
      .subscribe(res => {
        console.log(res);
        this.numerodoc = (Number(JSON.parse(JSON.stringify(res))) + 1).toString();
        this.DocumentoT[0].Numero = this.numerodoc;
        console.log(this.numerodoc);
      });
  }

  /**
   * Método que ocurre cuando el usuario selecciona el año de expiración de la tarjeta
   * @param yearNormalizado 
   */
  yearSelected(yearNormalizado: Moment){
    const ctrlValue = this.date.value;
    ctrlValue.year(yearNormalizado.year());
    this.date.setValue(ctrlValue);
  }

  /**
   * Método que ocurre cuando el usuario selecciona el mes de expiración de su tarjeta
   * @param mesNormalizado : mes seleccionado
   * @param datepicker : objeto de datepicker
   */
  mesSelected(mesNormalizado: Moment, datepicker: MatDatepicker<Moment>){
    const ctrlValue = this.date.value;
    ctrlValue.month(mesNormalizado.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
}