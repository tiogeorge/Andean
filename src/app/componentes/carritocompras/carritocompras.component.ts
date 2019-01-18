import { Articulo } from '../articulo-detalle/articulo';
import { ArticuloDetalleService } from '../articulo-detalle/articulo-detalle.service';
import { Constantes } from '../constantes';
import { Component, OnInit } from "@angular/core";
import { Region } from '../perfil-usuario/region';
import { RegionService } from '../perfil-usuario/region.service';
import { UsuarioService } from '../perfil-usuario/usuario.service';

@Component({
  selector: "app-carritocompras",
  templateUrl: "./carritocompras.component.html",
  styleUrls: ["./carritocompras.component.css"]
})
export class CarritocomprasComponent implements OnInit {
  listaCarrito            : any[];
  listaArticulos          : Articulo[] = [];
  listaPlanArticulo       : any[] = [];
  urlImagenes             : string = Constantes.URL_IMAGEN;
  mostrarArticulos        : boolean = true;
  sinProductos            : boolean = false;
  mostrarEnvio            : boolean = false;
  mostrarCupon            : boolean = false;
  tituloEliminar          : string = '';
  alturaImg               : string;

  constructor(public usuarioService: UsuarioService, public articuloDetalleService: ArticuloDetalleService, public regionService: RegionService) {
  }

  ngOnInit() {
    this.responsivo();
    this.articuloDetalleService.getCarrito().subscribe( res => {
      console.log(res);
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        this.listaCarrito = jres.data;
        for(var i = 0; i < this.listaCarrito.length; i++){
          this.listaArticulos.push(this.listaCarrito[i][0]);
          this.listaPlanArticulo.push(this.listaCarrito[i][1]);
          this.mostrarArticulos = true;
          this.sinProductos = false;
        }
      }    
    });    
    this.mencart();
  }

  responsivo(): void {
    if( screen.width <= 576){
      this.alturaImg = "75px";
    } else if(screen.width <= 768){
      this.alturaImg = "75px";
    } else if(screen.width <= 992){
      this.alturaImg = "150px";
    } else if(screen.width <= 1200){
      this.alturaImg = "150px";
    } else {
      this.alturaImg = "150px";
    }
  }

  mostrardivenvio() {
    this.regionService.getRegiones().subscribe( res => {
      this.regionService.regiones = res as Region[];
      console.log(res);
    });
    this.mostrarEnvio = this.mostrarEnvio ? false : true;
  }

  eliminaritem(url: string) {
    this.usuarioService.eliminarArticuloCarrito(url).subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        var posicion = this.listaCarrito.indexOf(url);
        this.listaCarrito.splice(posicion, 1);
        this.listaArticulos.splice(posicion, 1);
      }else{
        console.error(jres.error);
      }
    });
    this.mencart();
  }

  eliminartodo(){
    this.usuarioService.eliminarArticulosCarrito().subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if( jres.status){
        this.listaArticulos = [];
      } else {
        console.error(jres.error);
      }
    });
    this.mencart();
  }

  mencart(){
    if(this.listaArticulos.length == 0) {
      this.sinProductos = true;
      this.mostrarArticulos = false;
    }
  }
}
