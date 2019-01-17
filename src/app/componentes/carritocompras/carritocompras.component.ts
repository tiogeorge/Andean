import { ArticuloDetalleService } from '../articulo-detalle/articulo-detalle.service';
import { Component, OnInit } from "@angular/core";
import { Constantes } from '../constantes';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Articulo } from '../articulo-detalle/articulo';

@Component({
  selector: "app-carritocompras",
  templateUrl: "./carritocompras.component.html",
  styleUrls: ["./carritocompras.component.css"]
})
export class CarritocomprasComponent implements OnInit {
  listaCarrito            : any[];
  listaArticulos          : Articulo[] = [];
  listaPlanArticulo       : any[] = [];
  usuarioService          : UsuarioService;
  articuloDetalleService  : ArticuloDetalleService;
  urlImagenes             : string = Constantes.URL_IMAGEN;
  mostrarArticulos        : boolean = true;
  sinProductos            : boolean = false;
  mostrarEnvio            : boolean = false;
  mostrarCupon            : boolean = false;

  constructor(usuarioService: UsuarioService, articuloDetalleService: ArticuloDetalleService) {
    this.articuloDetalleService = articuloDetalleService;
    this.usuarioService = usuarioService;
  }

  ngOnInit() {
    this.articuloDetalleService.getCarrito().subscribe( res => {
      console.log(res);
      var jres = JSON.parse(JSON.stringify(res));
      this.listaCarrito = jres.data;
      for(var i = 0; i < this.listaCarrito.length; i++){
        this.listaArticulos.push(this.listaCarrito[i][0]);
        this.listaPlanArticulo.push(this.listaCarrito[i][1]);
        this.mostrarArticulos = true;
        this.sinProductos = false;
      }
    });    
    this.mencart();
  }

  mostrardivenvio() {
    this.mostrarEnvio = this.mostrarEnvio ? false : true;
  }

  mostrardivcupon() {
    this.mostrarCupon = this.mostrarCupon ? false : true;
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
