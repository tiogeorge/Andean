import { Router } from '@angular/router';
import { Usuario } from './../perfil-usuario/usuario';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChipInputEvent, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
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
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Respuesta } from '../perfil-usuario/respuesta';
declare var Culqi: any;

export interface NombreDirec {
  nombre: string;
}

export interface Tipolocalenvio {
  value: string;
}

export interface temdoc {
  Tipo: String,
  Serie: String,
  Numero: String,
}
export interface arttempo{
  id:string,
  idarticulo:string,
  cantidad:string,
}


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [
    { provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false } },
    DireccionService, PagoService],
  encapsulation: ViewEncapsulation.None
})

export class PagoComponent implements OnInit {
  pedidogenerado: string = '';
  isLinear = true;
  dato1: string = '';
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
  listaArticulos: any[] = [];
  tempoarti: Articulo[] = [];
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
  tiposDocumento: string[];
  Local: Tipolocalenvio[] = [
    { value: 'Casa' },
    { value: 'Oficina' },
    { value: 'Departamento' },
    { value: 'Edificio' },
    { value: 'Condominio' },
    { value: 'Otro' }
  ];
  procesandoPago : boolean = false;

  constructor(public snackBar: MatSnackBar, public _formBuilder: FormBuilder, public direccionService: DireccionService, public pagoservice: PagoService, public usuarioService: UsuarioService, public router: Router, public regionService: RegionService, public articuloDetalleService: ArticuloDetalleService) {
  }

  ngOnInit() {
    Culqi.publicKey = 'pk_test_VTysZ7uQfNqiFpwf';
    Culqi.init();
    this.tiposDocumento = ['DNI'];
    this.localselec = 'Casa';
    //obtener carrito
    this.articuloDetalleService.getCarrito().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      this.listaCarrito = jres.data;
      for (var i = 0; i < this.listaCarrito.length; i++) {
        this.listaArticulos = jres.data as any[];
        this.mostrarArticulos = true;
        this.sinProductos = false;
      }
      this.sumarprecios();
    });
    //precios
    //   
    //stepps
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    //fin stepps
    //recuperar usuario
    this.usuarioService.getUsuarioLogeado().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status) {
        this.usuarioService.usuarioSeleccionado = jres.data as Usuario;
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
    this.generarnumerodepedido();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({
        nombre: value.trim()
      });
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
    this.dato1 = 'siguiente';
    this.logocard = nombreicon;
    for (var i = 0; i < Object.keys(this.RespuestaDir).length; i++) {
      if (this.RespuestaDir[i]._id == id) {
        this.direccionService.selecDireccion = this.RespuestaDir[i];
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
      } else {
        document.getElementById(this.RespuestaDir[i]._id).style.background = '';
        document.getElementById(this.RespuestaDir[i]._id).style.color = 'black';
      }
    }
    this.firstFormGroup.get('firstCtrl').setValue('siguiente'); //
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

  mostrarform(value: string) {
    if (value == '1') {
      if (document.getElementById('datostarjeta').hidden == true) {
        document.getElementById('datostarjeta').hidden = false;
        document.getElementById('btnsig2').style.display = 'block';
        this.pagoservice.selectPago.idTipoPago = 'tarjeta';
      } else {
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
    } else {
      document.getElementById('Agregardireccion').hidden = true;
      this.nombreicondir = 'add';
    }
  }

  //funciones
  sumarprecios() {
    console.log('entra');
    var sum = 0;
    for (var j = 0; j < this.listaArticulos.length; j++) {
      sum = sum + (this.listaArticulos[j].precio - this.listaArticulos[j].precio * this.listaArticulos[j].descuento / 100);
      //console.log('suma' + sum.toString());
    }
    this.subtotal = sum.toString();
    this.montoenvio = '10';
    this.preciototal = (Number(this.subtotal) + Number(this.montoenvio)).toString();
  }
  
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.direccionService.selecDireccion = new Direccion();
    }
  }

  AgregarDireccion(form: NgForm) {
    var rres;
    this.direccionService.AgregarDireccion(form.value)
      .subscribe(res => {
        rres = JSON.parse(JSON.stringify(res));
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
    this.firstFormGroup.get('firstCtrl').setValue('siguiente');//
    document.getElementById('Agregardireccion').hidden = true;
    document.getElementById('Resumendir').hidden = false;
    this.dato1 = 'siguiente';
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
        var Respuesta = JSON.parse(JSON.stringify(res));
        for (var i = 0; i < Object.keys(res).length; i++) {
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
        this.listtemporaldir = Respuesta;
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
    //this.guardarventa('11111111111');
    this.actualizarcantidad();
  }

  guardarventa(idpago:string) {
    var idpagoculqi=idpago;
    this.DocumentoT[0].Tipo = this.tipodoc;
    this.pagoservice.recuperarserie()
      .subscribe(res => {
        console.log(res);
        this.seriedoc = JSON.parse(JSON.stringify(res));
        this.DocumentoT[0].Serie = this.seriedoc;
        console.log(this.seriedoc);
        this.pagoservice.recuperarnumerodoc()
          .subscribe(res => {
            console.log(res);
            this.numerodoc = (Number(JSON.parse(JSON.stringify(res))) + 1).toString();
            this.DocumentoT[0].Numero = this.numerodoc;
            console.log(this.numerodoc);
            //
            this.pagoservice.selectPago.idTipoPago = 'tarjeta';
            this.pagoservice.selectPago.idUsuario = this.user;
            this.pagoservice.selectPago.Correocliente = this.correoclient;
            this.pagoservice.selectPago.Articulo = this.listaArticulos;
            this.pagoservice.selectPago.FechaCompra = new Date(); //new Date(2019, 1, 17);
            this.pagoservice.selectPago.idTipoPago = 'tarjeta';
            this.pagoservice.selectPago.EstadoPago = 'Pagado';
            this.pagoservice.selectPago.NroPedido = this.pedidogenerado;
            this.pagoservice.selectPago.EstadoEnvio = 'Proceso';
            this.pagoservice.selectPago.FechaEnvio = new Date();
            this.pagoservice.selectPago.FechaEntrega = new Date();
            this.pagoservice.selectPago.PrecioTotal = this.preciototal;
            this.pagoservice.selectPago.NroTransaccion = idpagoculqi;
            this.pagoservice.selectPago.Documento = this.DocumentoT;
            console.log('documento actua');
            console.log(this.pagoservice.selectPago.Documento);
            this.pagoservice.selectPago.idVendedor = 'ROOT';
            this.pagoservice.GuardarPago(this.pagoservice.selectPago)
              .subscribe(res => {
                console.log(res);
                if (JSON.parse(JSON.stringify(res)).mensaje == 'ok') {
                  this.snackBar.open('Venta Realizada', '🧓🏻', {
                    duration: 2000,
                  });
                } else {
                  alert('Error!!!');
                }
              });
          });
      });
  }

  actualizarcantidad(){
    console.log(this.listaArticulos);
    var art:any[]=new Array();
    console.log(this.listaArticulos.length);
    for(var i=0;i<this.listaArticulos.length;i++){
      var artem={
        id:this.listaArticulos[i].id,
        idarticulo:this.listaArticulos[i].idarticulo,
        cantidad:this.listaArticulos[i].cantidad,
      }
      art.push(artem);
    }
    console.log(art);
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
   * Método para realizar el pago de la compra por medio de la pasarela de Culqi
   */
  pagar() {
    this.procesandoPago = true;
    Culqi.createToken();
    if (Culqi.token) {
      this.openSnackBar(true, 'Procesando la compra');
      this.pagoservice.procesarPago(Culqi.token.id, Culqi.token.email, this.preciototal).subscribe(res => {
        const rspta = res as Respuesta;
        this.terminarPago(rspta); 
      });
    } else {
      this.openSnackBar(false, Culqi.error);
    }
  }

  /**
   * Método que oculta el progress bar y muestra el mensaje de respuesta
   * @param respuesta 
   */
  terminarPago(respuesta: Respuesta){
    var idpago=respuesta.data.id;
    this.procesandoPago = false;
    if(respuesta.status){
      this.openSnackBar(respuesta.status, respuesta.msg);
      this.guardarventa(idpago);
    } else {
      this.openSnackBar(respuesta.status, respuesta.error);
    }
  }

  generarnumerodepedido() {
    var pedidogen = rand(12, 12);
    this.pedidogenerado = pedidogen.toUpperCase();
  }

  /**
   * Abre un menú en la parte inferior mostrando un mensaje 
   * @param status : tipo de mensaje a mostrar
   * @param mensaje : cuerpo del mensaje
   */
  openSnackBar(status: boolean, mensaje: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      panelClass: [status ? 'exito' : 'error'],
      data: mensaje
    });
  }
}

function rand(length, current) {
  current = current ? current : '';
  return length ? rand(--length, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 60)) + current) : current;
}