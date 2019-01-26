import { Router } from '@angular/router';
import { Usuario } from './../perfil-usuario/usuario';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
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
import { MatSnackBar } from '@angular/material';
import { Pago } from './pago';
import { from } from 'rxjs';

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
  idarticulo:string;
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
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }, DireccionService, PagoService],
  encapsulation: ViewEncapsulation.None
})

export class PagoComponent implements OnInit {
  listaCarrito: any[];
  listaArticulos: Articulo[] = [];
  tempoarti: Articulo[] = [];
  listaPlanArticulo: any[] = [];
 // listaArticulos2: temarti[] = [];
  listaArticulos2: any[] = [];
  mostrarArticulos: boolean = true;
  sinProductos: boolean = false;
  articuloDetalleService: ArticuloDetalleService;
  usuario: Usuario;
  usuarioService: UsuarioService;
  regionService: RegionService;
  router: Router;
  user: string = '';
  correoclient:string='';
  listdirecciones: string[];
  localselec: string = 'Casa';
  RespuestaDir: any;
  logocard: string = '';
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

  Documento: temdoc[] = [{ Tipo: 'BBV', Serie: '1', Numero: '0001' }];

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

  constructor(public snackBar: MatSnackBar,public _formBuilder: FormBuilder, public direccionService: DireccionService, public pagoservice: PagoService, usuarioService: UsuarioService, router: Router, regionService: RegionService, articuloDetalleService: ArticuloDetalleService) {
    this.articuloDetalleService = articuloDetalleService;
    this.usuarioService = usuarioService;
    this.router = router;
    this.regionService = regionService;
  }

  ngOnInit() {
    //obtener carrito
    this.articuloDetalleService.getCarrito().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      this.listaCarrito = jres.data;
      for (var i = 0; i < this.listaCarrito.length; i++) {
        this.listaArticulos.push(this.listaCarrito[i][0]);
        //   this.listaArticulos2=this.listaArticulos;
        this.listaPlanArticulo.push(this.listaCarrito[i][1]);
        //   this.listaArticulos2[i].push(this.listaPlanArticulo[0]);
        this.mostrarArticulos = true;
        this.sinProductos = false;
      }
      console.log('arreglo articulos');
      console.log(this.listaArticulos);
      console.log('arreglo planes');
      console.log(this.listaPlanArticulo);
      console.log('arreglo carrito');
      console.log(this.listaCarrito);
      //   console.log(this.listaArticulos2);
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
    //  document.getElementById('datostarjeta').hidden = true;
    //document.getElementById('Agregardireccion').hidden = true;
    //recuperar usuario
    this.usuarioService.getUsuarioLogeado().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status) {
        this.usuario = jres.data as Usuario;
        console.log(this.usuario._id);
        this.user = this.usuario._id;
        this.correoclient=this.usuario.correo;
        console.log('usuario');
        console.log(this.usuario);
        console.log('fin usuario');
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
    }
    if (value == '3') {
      document.getElementById('datostarjeta').hidden = true;
      this.pagoservice.selectPago.idTipoPago = 'deposito';
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
    console.log('lista de articulo del carrito');
    console.log(this.listaArticulos2);
  }
  //
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.direccionService.selecDireccion = new Direccion();
    }
  }
  AgregarDireccion(form: NgForm) {
    this.direccionService.AgregarDireccion(this.direccionService.selecDireccion)
      .subscribe(res => {
        console.log(res);
        /* resumedir*/
        document.getElementById('lbdirec').innerHTML = this.direccionService.selecDireccion.direccion;
        document.getElementById('lbtipolocal').innerHTML = this.direccionService.selecDireccion.tipolocal;
        document.getElementById('lbdepartamento').innerHTML = this.direccionService.selecDireccion.departamento;
        document.getElementById('lbprovincia').innerHTML = this.direccionService.selecDireccion.provincia;
        document.getElementById('lbdistrito').innerHTML = this.direccionService.selecDireccion.distrito;
        document.getElementById('lbreferencia').innerHTML = this.direccionService.selecDireccion.referencia;
        document.getElementById('lbtelefono').innerHTML = this.direccionService.selecDireccion.telefono;
        this.nombreiconresdir(this.direccionService.selecDireccion.tipolocal);
        /*fin */
        this.resetForm(form);
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
  guardarventa(form: NgForm) {
    // this.pagoservice.selectPago._id = 'asdsadsadsadsa';
    this.pagoservice.selectPago.idUsuario = this.user;
    this.pagoservice.selectPago.Correocliente=this.correoclient;
    //console.log(this.Arti);
    //this.pagoservice.selectPago.Articulo.push(this.Arti[0]);
    this.pagoservice.selectPago.Articulo = this.listaArticulos2;
    this.pagoservice.selectPago.FechaCompra = new Date(2019, 1, 17);
    this.pagoservice.selectPago.EstadoPago = 'Proceso';
    this.pagoservice.selectPago.Mensaje = 'mensaje ejemplo';
    this.pagoservice.selectPago.EstadoEnvio = 'Proceso';
    this.pagoservice.selectPago.FechaEnvio = new Date(2019, 1, 18);
    this.pagoservice.selectPago.FechaEntrega = new Date(2019, 1, 22);
    this.pagoservice.selectPago.PrecioTotal = this.preciototal;
    this.pagoservice.selectPago.NroTransaccion = '2323232';
    this.pagoservice.selectPago.Documento = this.Documento;
    this.pagoservice.selectPago.idVendedor = 'ROOT';
    console.log(this.pagoservice.selectPago.FechaEntrega);
    this.pagoservice.GuardarPago(this.pagoservice.selectPago)
      .subscribe(res => {
        console.log(res);
        if(res='ok'){
          this.snackBar.open('Venta Realizada', '🧓🏻', {
            duration: 2000,
          });
        }
        else{

        }
      });
  }

}
