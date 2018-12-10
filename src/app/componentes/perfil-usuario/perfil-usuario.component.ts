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
  direccionService            : DireccionService;
  flashMessageService         : NgFlashMessageService;
  mostrarFormularioDireccion  : boolean = false;
  mostrarMensajeCliente       : boolean = false;
  mostrarMensajeDireccion     : boolean = false;
  regionService               : RegionService;
  router                      : Router;
  tiposDocumento              : string[];
  tiposVivienda               : string[] = [ 'Casa', 'Oficina', 'Departamento', 'Edificio', 'Condominio', 'Otro'];
  usuarioService              : UsuarioService;

  constructor( private adapter: DateAdapter<any>, direccionService: DireccionService, flashMessageService: NgFlashMessageService, regionService: RegionService,router: Router, usuarioService: UsuarioService) {
    this.adapter.setLocale('es');
    this.direccionService     = direccionService;
    this.flashMessageService  = flashMessageService;   
    this.regionService        = regionService;
    this.router               = router;
    this.tiposDocumento       = ['DNI'];
    this.usuarioService       = usuarioService;
  }

  ngOnInit() {
    this.usuarioService.getUsuarioLogeado(localStorage.getItem("_tk")).subscribe(res =>{
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){      
        this.usuarioService.usuarioSeleccionado = jres.data;
        this.getDirecciones(jres.data._id);
      }else{
        this.router.navigate(['/']);
      }
    });
  }

  actualizar(): void{
    this.usuarioService.putUsuario(this.usuarioService.usuarioSeleccionado).subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      this.mostrarMensajeCliente = true;
      this.mostrarMensajeDireccion = false;
      jres.status ? this.mostrarMensaje(jres.msg,'success') : this.mostrarMensaje(jres.error, 'danger');
    });
  }

  agregarDireccion(direccion: Direccion){
    if(direccion._id){
      this.direccionService.actualizarDireccion(direccion).subscribe(res => {
        var jres = JSON.parse(JSON.stringify(res));
        this.mostrarMensajeCliente = false;
        this.mostrarMensajeDireccion = true;
        if (jres.status){
          this.mostrarFormularioDireccion = false;
          this.mostrarMensaje(jres.msg, 'success');
        }else {
          this.mostrarMensaje(jres.error, 'danger');
        }
      })
    } else {
      this.direccionService.AgregarDireccion(direccion).subscribe(res => {
        var jres = JSON.parse(JSON.stringify(res));
        if( jres.status) {
          this.mostrarFormularioDireccion = false;
          this.mostrarMensaje(jres.msg, 'success');
          this.direccionService.direccion.push(jres.data as Direccion);
        }else{
          this.mostrarMensaje(jres.error, 'danger');
        }
      })
    }
  }

  departamentoSelected(departamento: string){
    var i : number = 0;
    while(this.regionService.regiones[i].departamento != departamento){ i++; }
    this.regionService.departamentoSelected = this.regionService.regiones[i];
    this.regionService.provinciaSelected = new Provincia("",[]);
  }

  getDirecciones(_id: string){
    this.direccionService.ListarDireccion(_id).subscribe( res => {
      this.direccionService.direccion = res as Direccion[];
      this.getRegiones();
    })
  }

  getRegiones(){
    this.regionService.getRegiones().subscribe(res => {
      this.regionService.regiones = res as Region[];
    })
  }

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

  mostrarFormulario(){
    this.botonActualizar = "Agregar nueva dirección";
    this.direccionService.selecDireccion = new Direccion();
    this.mostrarFormularioDireccion = this.mostrarFormularioDireccion ? false : true;
  }

  mostrarMensaje(mensaje: string, tipo: string): void {
    this.flashMessageService.showFlashMessage({messages: [mensaje], timeout: 5000, dismissible: true, type: tipo});
  }

  nuevadireccion(form?: NgForm){
    this.direccionService.selecDireccion.usuario = this.usuarioService.usuarioSeleccionado._id;
    this.agregarDireccion(this.direccionService.selecDireccion);
    this.direccionService.selecDireccion = new Direccion();
  }

  provinciaSelected(provincia: string){
    var i : number = 0;
    while(this.regionService.departamentoSelected.provincias[i].provincia != provincia){ i++; }
    this.regionService.provinciaSelected = this.regionService.departamentoSelected.provincias[i];
  }

}
