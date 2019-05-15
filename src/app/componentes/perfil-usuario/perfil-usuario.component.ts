import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Title } from '@angular/platform-browser';
import { Direccion } from '../pago/direccion';
import { DireccionService } from '../pago/direccion.service';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Region } from './region';
import { RegionService } from './region.service';
import { Respuesta } from './respuesta';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { UsuarioService } from './usuario.service';
import { PagoService } from '../pago/pago.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})

export class PerfilUsuarioComponent implements OnInit {
  botonActualizar: string;
  mostrarFormularioDireccion: boolean = false;
  tiposDocumento: string[];
  tiposVivienda: string[] = ['Casa', 'Oficina', 'Departamento', 'Edificio', 'Condominio', 'Otro'];
  url: string;
  arreglopedidos:any;
  fechacompraP:string='';
  fechaenvioP:string='';
  estadoenvioP:string='';
  preciototalP:number=0;
  articulosP:any='';
  valuePedido=0;

  constructor(public adapter: DateAdapter<any>, 
      public direccionService: DireccionService, 
      public regionService: RegionService, 
      public router: Router, 
      public usuarioService: UsuarioService, 
      public snackBar: MatSnackBar,
      public pagoservice: PagoService,
      public titleService: Title) {
    this.adapter.setLocale('es');
    this.tiposDocumento = ['DNI'];
  }

  ngOnInit() {
    this.titleService.setTitle('Perfil de Usuario | Smarket');
    /*this.usuarioService.getUsuarioLogeado().subscribe(res => {
      const respuesta = res as Respuesta;
      if (respuesta.status) {
        this.usuarioService.usuarioSeleccionado = respuesta.data;
        this.getDirecciones(respuesta.data._id);
        //recuperar pedidos
        this.recuperarpedidoscorreo(respuesta.data.correo);
        //
      } else {
        this.router.navigate(['/']);
      }
    });*/
    this.url = this.router.url;
  }

  /**
   * Método que actualiza los datos de un usuario
   */
  actualizar(): void {
    if (this.usuarioService.usuarioSeleccionado.numeroDocumento.length != 8) {
      this.openSnackBar(false, 'El documento debe tener una longitud de 8 dígitos');
    } else {
      this.usuarioService.putUsuario(this.usuarioService.usuarioSeleccionado).subscribe(res => {
        const respuesta = res as Respuesta;
        respuesta.status ? this.openSnackBar(respuesta.status, respuesta.msg) : this.openSnackBar(respuesta.status, respuesta.error);
      });
    }
  }

  /**
   * Método que permite añadir una nueva dirección al cliente
   * @param direccion : datos de la dirección
   */
  agregarDireccion(direccion: Direccion) {
    if (direccion._id) {
      this.direccionService.actualizarDireccion(direccion).subscribe(res => {
        const respuesta = res as Respuesta;
        if (respuesta.status) {
          this.mostrarFormularioDireccion = false;
          this.openSnackBar(respuesta.status, respuesta.msg);
        } else {
          this.openSnackBar(respuesta.status, respuesta.error);
        }
      })
    } else {
      this.direccionService.AgregarDireccion(direccion).subscribe(res => {
        const respuesta = res as Respuesta;
        if (respuesta.status) {
          this.mostrarFormularioDireccion = false;
          this.openSnackBar(respuesta.status, respuesta.msg);
          this.direccionService.direccion.push(respuesta.data as Direccion);
        } else {
          this.openSnackBar(respuesta.status, respuesta.error);
        }
      })
    }
  }

  /**
   * Método que muestra las direcciones que tiene un cliente
   * @param _id 
   */
  getDirecciones(_id: string) {
    this.direccionService.ListarDireccion(_id).subscribe(res => {
      this.direccionService.direccion = res as Direccion[];
      this.getRegiones();
    })
  }

  /**
   * Método que muestra las regiones existentes
   */
  getRegiones() {
    this.regionService.getRegiones().subscribe(res => {
      this.regionService.regiones = res as Region[];
    })
  }

  /**
   * Método que muestra los campos para modificar una dirección existente
   * @param direccion 
   */
  mostrarDireccion(direccion: Direccion) {
    this.botonActualizar = "ACTUALIZAR MI DIRECCIÓN";
    this.direccionService.selecDireccion = direccion;
    var i = 0;
    while (this.regionService.regiones[i].departamento != this.direccionService.selecDireccion.departamento) { i++ }
    this.regionService.departamentoSelected = this.regionService.regiones[i];
    i = 0;
    while (this.regionService.departamentoSelected.provincias[i].provincia != this.direccionService.selecDireccion.provincia) { i++ }
    this.regionService.provinciaSelected = this.regionService.departamentoSelected.provincias[i];
    this.mostrarFormularioDireccion = true;
  }

  /**
   * Métod que muestra el formulario para agregar una dirección
   */
  mostrarFormulario() {
    this.botonActualizar = "AGREGAR UNA NUEVA DIRECCIÓN";
    this.direccionService.selecDireccion = new Direccion();
    this.mostrarFormularioDireccion = this.mostrarFormularioDireccion ? false : true;
  }

  /**
   * Método que guarda la nueva dirección del cliente
   * @param form : datos de la nueva dirección
   */
  nuevadireccion(form?: NgForm) {
    this.direccionService.selecDireccion.usuario = this.usuarioService.usuarioSeleccionado._id;
    this.agregarDireccion(this.direccionService.selecDireccion);
    this.direccionService.selecDireccion = new Direccion();
  }

  /**
   * Método que muestra un Bar temporal para confirmar los mensajes de éxito y de error
   */
  openSnackBar(status: boolean, mensaje: string): void {
    var clase = status ? 'exito' : 'error';
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      panelClass: [clase],
      data: mensaje
    });
  }

  recuperarpedidoscorreo(correo:string){
    this.pagoservice.recuperarpedidocorreo(correo)
    .subscribe(res=>{
      this.arreglopedidos=JSON.parse(JSON.stringify(res));
      //console.log(this.arreglopedidos);
    });
  }
  detallepedido(fechacompra:Date,fechaenvio:Date,estadoenvio:string,preciototal:number,articulos:any){
    document.getElementById('seguimiento-de-compra').hidden=true;
    document.getElementById('detalle').hidden=false;

    var fechacom = new Date(fechacompra);
    var fechaenv=new Date(fechaenvio)
    var compradia = fechacom.getDate();
    var ventadia=fechaenv.getDate();
    var comprames = fechacom.getMonth() + 1;
    var ventames=fechaenv.getMonth()+1;
    var compraanio = fechacom.getFullYear();
    var ventaanio=fechaenv.getFullYear();
    this.fechacompraP = String(compraanio + "-" + comprames + "-" + compradia);
    this.fechaenvioP=String(ventaanio + "-" + ventames + "-" + ventadia);
    this.estadoenvioP=estadoenvio;
    this.preciototalP=preciototal;
    this.articulosP=articulos;
  }
  regresarped(){
    document.getElementById('seguimiento-de-compra').hidden=false;
    document.getElementById('detalle').hidden=true;
  }

}
