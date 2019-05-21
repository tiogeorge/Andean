import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Articulo } from '../articulo-detalle/articulo';
import { ArticuloDetalleService } from '../articulo-detalle/articulo-detalle.service';
import { ValoracionService } from "./valoracion.service";
import { Valoracion } from './valoracion';
import { Usuario } from './../perfil-usuario/usuario';
import { UsuarioService } from './../perfil-usuario/usuario.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {
  message: string = "Valoracion Nueva"
  @Output() messageEvent = new EventEmitter<string>();

  articuloService: ArticuloDetalleService;
  usuarioService: UsuarioService;
  valoracionService: ValoracionService;
  clienteComento = false;
  sesionActiva = false;
  valoracionNueva = new Valoracion();
  tiempo            : number;

  constructor(private route: ActivatedRoute, articuloService: ArticuloDetalleService, usuarioService: UsuarioService, valoracionService: ValoracionService) {
    this.articuloService = articuloService;
    this.usuarioService = usuarioService;
    this.valoracionService = valoracionService;
  }

  ngOnInit() {
    var url = this.route.snapshot.paramMap.get("id");
    this.articuloService.getArticulo(url).subscribe(res => {
      this.articuloService.articuloSeleccionado = res[0] as Articulo;
      this.recuperarValoraciones();
      this.tiempo = Date.now();

      /*this.usuarioService.getUsuarioLogeado().subscribe(res => {
        var jres = JSON.parse(JSON.stringify(res));
        if (jres.status) {
          this.usuarioService.usuarioSeleccionado = jres.data as Usuario;
          this.sesionActiva = true;
          this.recuperarValoracionesLogeadoCliente();  
          this.recuperarValoracionesLogeadoSinCliente();                
        }
      });*/ 
    });
  }

  ngAfterViewInit() {
    
  }

  sendMessage() {
    this.messageEvent.emit(this.message)
  }

  recuperarValoraciones() {
    this.valoracionService.obtenerValoracionesArticulo(this.articuloService.articuloSeleccionado.idarticulo).subscribe(res => {
      this.valoracionService.valoraciones = res as Valoracion[];
    });
  }

  recuperarValoracionesLogeadoCliente() {
    this.valoracionService.obtenerValoracionCliente(this.articuloService.articuloSeleccionado.idarticulo, this.usuarioService.usuarioSeleccionado._id).subscribe(res => {
      this.valoracionService.valoracionCliente = (res as Valoracion[])[0];
      if (this.valoracionService.valoracionCliente != undefined ) {
        this.clienteComento = true;
      }
    });
  }

  recuperarValoracionesLogeadoSinCliente() {
      this.valoracionService.obtenerValoracionesSinCliente(this.articuloService.articuloSeleccionado.idarticulo, this.usuarioService.usuarioSeleccionado._id).subscribe(res => {
        this.valoracionService.valoracionSinCliente = res as Valoracion[];
      })
  }

  comentar() {
    this.valoracionNueva.cliente = this.usuarioService.usuarioSeleccionado._id;
    this.valoracionNueva.idarticulo = this.articuloService.articuloSeleccionado.idarticulo;
    this.valoracionNueva.nombrecliente = this.usuarioService.usuarioSeleccionado.nombres;
    this.valoracionService.crearValoracion(this.valoracionNueva).subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      this.recuperarValoracionesLogeadoCliente();
      this.recuperarValoraciones();    
      this.sendMessage();
    });
  }
}
