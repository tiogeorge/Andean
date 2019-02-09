import { Component, OnInit } from '@angular/core';
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
  articuloService: ArticuloDetalleService;
  usuarioService: UsuarioService;
  valoracionService: ValoracionService;
  clienteComento = false;
  sesionActiva = false;
  numeroComentarios: Number = 0;
  promedioValoracion: Number = 0;
  valoracionNueva = new Valoracion();

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
    });

    this.usuarioService.getUsuarioLogeado().subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      if (jres.status) {
        console.log(jres.status);
        this.usuarioService.usuarioSeleccionado = jres.data as Usuario;
        this.sesionActiva = true;
        this.recuperarValoracionesLogeado();  
        this.recuperarValoracionesLogeado2();      
      }
    }); 
  }

  ngAfterViewInit() {
    
  }

  recuperarValoraciones() {
    this.valoracionService.obtenerValoracionesArticulo(this.articuloService.articuloSeleccionado.idarticulo).subscribe(res => {
      console.log("Solo producto");
      this.valoracionService.valoraciones = res as Valoracion[];
      console.log(this.valoracionService.valoraciones);
    });
  }

  recuperarValoracionesLogeado() {
    this.valoracionService.obtenerValoracionCliente(this.articuloService.articuloSeleccionado.idarticulo, this.usuarioService.usuarioSeleccionado._id).subscribe(res => {
      console.log("Solo cliente");
      this.valoracionService.valoracionCliente = (res as Valoracion[])[0];
      if (this.valoracionService.valoracionCliente != undefined ) {
        this.clienteComento = true;
      }
      console.log(this.valoracionService.valoracionCliente);
    });
  }

  recuperarValoracionesLogeado2() {
      this.valoracionService.obtenerValoracionesSinCliente(this.articuloService.articuloSeleccionado.idarticulo, this.usuarioService.usuarioSeleccionado._id).subscribe(res => {
        console.log("Todo menos cliente");
        this.valoracionService.valoracionSinCliente = res as Valoracion[];
        console.log(this.valoracionService.valoracionSinCliente);
      })
  }
/*
  calcularNumeroComentarios() {
    this.numeroComentarios = this.valoracionService.valoraciones.length;
  }

  calcularValoracionPromedio() {
    var a = this.valoracionService.valoraciones;
    if (a !== undefined) {
      if (a.length > 0) {
        var sum = 0;
        for (var i = 0; i < a.length; i++) {
          sum += Number(a[i].puntuacion);
        }
        var prom = Math.round(sum / a.length);
        this.promedioValoracion = prom;
      }
    }
  }
*/
  comentar() {
    console.log("Nuevo comentario");
    console.log(this.usuarioService.usuarioSeleccionado._id);
    console.log(this.articuloService.articuloSeleccionado.idarticulo);
    console.log(this.usuarioService.usuarioSeleccionado.nombres);
    this.valoracionNueva.cliente = this.usuarioService.usuarioSeleccionado._id;
    this.valoracionNueva.idarticulo = this.articuloService.articuloSeleccionado.idarticulo;
    this.valoracionNueva.nombrecliente = this.usuarioService.usuarioSeleccionado.nombres;
    this.valoracionService.crearValoracion(this.valoracionNueva).subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      console.log(jres);
      this.recuperarValoracionesLogeado();    
    });
    
  }

}
