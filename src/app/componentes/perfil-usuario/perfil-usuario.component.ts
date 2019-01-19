import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Direccion } from '../pago/direccion';
import { DireccionService } from '../pago/direccion.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { NgForm } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Provincia } from './provincia';
import { Region } from './region';
import { RegionService } from './region.service';
import { Respuesta } from './respuesta';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})

export class PerfilUsuarioComponent implements OnInit {
  botonActualizar             : string;
  mostrarFormularioDireccion  : boolean = false;
  mostrarMensajeCliente       : boolean = false;
  mostrarMensajeDireccion     : boolean = false;
  tiposDocumento              : string[];
  tiposVivienda               : string[] = [ 'Casa', 'Oficina', 'Departamento', 'Edificio', 'Condominio', 'Otro'];
  url                         : string;

  constructor( public adapter: DateAdapter<any>, public direccionService: DireccionService, public flashMessageService: NgFlashMessageService, public regionService: RegionService, public router: Router, public usuarioService: UsuarioService) {
    this.adapter.setLocale('es'); 
    this.tiposDocumento       = ['DNI'];
  }

  ngOnInit() {
    this.usuarioService.getUsuarioLogeado().subscribe( res => {
      const respuesta = res as Respuesta;
      if(respuesta.status){      
        this.usuarioService.usuarioSeleccionado = respuesta.data;
        this.getDirecciones(respuesta.data._id);
      }else{
        this.router.navigate(['/']);
      }
    });
    this.url = this.router.url;
  }

  /**
   * Método que actualiza los datos de un usuario
   */
  actualizar(): void{
    this.usuarioService.putUsuario(this.usuarioService.usuarioSeleccionado).subscribe(res => {
      const respuesta = res as Respuesta;
      this.mostrarMensajeCliente = true;
      this.mostrarMensajeDireccion = false;
      respuesta.status ? this.mostrarMensaje(respuesta.msg,'success') : this.mostrarMensaje(respuesta.error, 'danger');
    });
  }

  /**
   * Método que permite añadir una nueva dirección al cliente
   * @param direccion : datos de la dirección
   */
  agregarDireccion(direccion: Direccion){
    if(direccion._id){
      this.direccionService.actualizarDireccion(direccion).subscribe(res => {
        const respuesta = res as Respuesta;
        this.mostrarMensajeCliente = false;
        this.mostrarMensajeDireccion = true;
        if (respuesta.status){
          this.mostrarFormularioDireccion = false;
          this.mostrarMensaje(respuesta.msg, 'success');
        }else {
          this.mostrarMensaje(respuesta.error, 'danger');
        }
      })
    } else {
      this.direccionService.AgregarDireccion(direccion).subscribe(res => {
        const respuesta = res as Respuesta;
        if( respuesta.status) {
          this.mostrarFormularioDireccion = false;
          this.mostrarMensaje(respuesta.msg, 'success');
          this.direccionService.direccion.push(respuesta.data as Direccion);
        }else{
          this.mostrarMensaje(respuesta.error, 'danger');
        }
      })
    }
  }

  /**
   * Método que selecciona un departamento para la nueva dirección
   * @param departamento : nombre de la dirección
   */
  departamentoSelected(departamento: string){
    var i : number = 0;
    while(this.regionService.regiones[i].departamento != departamento){ i++; }
    this.regionService.departamentoSelected = this.regionService.regiones[i];
    this.regionService.provinciaSelected = new Provincia("",[]);
  }

  /**
   * Método que muestra las direcciones que tiene un cliente
   * @param _id 
   */
  getDirecciones(_id: string){
    this.direccionService.ListarDireccion(_id).subscribe( res => {
      this.direccionService.direccion = res as Direccion[];
      this.getRegiones();
    })
  }

  /**
   * Método que muestra las regiones existentes
   */
  getRegiones(){
    this.regionService.getRegiones().subscribe(res => {
      this.regionService.regiones = res as Region[];
    })
  }

  /**
   * Método que muestra los campos para modificar una dirección existente
   * @param direccion 
   */
  mostrarDireccion(direccion: Direccion){
    this.botonActualizar = "Actualizar mi dirección";
    this.direccionService.selecDireccion = direccion;
    var i = 0;
    while(this.regionService.regiones[i].departamento != this.direccionService.selecDireccion.departamento){ i ++}
    this.regionService.departamentoSelected = this.regionService.regiones[i];
    i = 0;
    while(this.regionService.departamentoSelected.provincias[i].provincia != this.direccionService.selecDireccion.provincia) { i++}
    this.regionService.provinciaSelected = this.regionService.departamentoSelected.provincias[i];
    this.mostrarFormularioDireccion = true;
  }

  /**
   * Métod que muestra el formulario para agregar una dirección
   */
  mostrarFormulario(){
    this.botonActualizar = "Agregar nueva dirección";
    this.direccionService.selecDireccion = new Direccion();
    this.mostrarFormularioDireccion = this.mostrarFormularioDireccion ? false : true;
  }

  /**
   * Método que muestra mensaje de confirmación
   * @param mensaje : mensaje que se muestra en el mensaje flash
   * @param tipo : tipo de mensaje, si es de éxito o error
   */
  mostrarMensaje(mensaje: string, tipo: string): void {
    this.flashMessageService.showFlashMessage({messages: [mensaje], timeout: 5000, dismissible: true, type: tipo});
  }

  /**
   * Método que guarda la nueva dirección del cliente
   * @param form : datos de la nueva dirección
   */
  nuevadireccion(form?: NgForm){
    this.direccionService.selecDireccion.usuario = this.usuarioService.usuarioSeleccionado._id;
    this.agregarDireccion(this.direccionService.selecDireccion);
    this.direccionService.selecDireccion = new Direccion();
  }

  /**
   * Método que selecciona una provincia
   * @param provincia : nombre de la provincia seleccionada
   */
  provinciaSelected(provincia: string){
    var i : number = 0;
    while(this.regionService.departamentoSelected.provincias[i].provincia != provincia){ i++; }
    this.regionService.provinciaSelected = this.regionService.departamentoSelected.provincias[i];
  }

}
