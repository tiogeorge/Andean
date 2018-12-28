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
  listaCarrito            : string[];
  listaArticulos          : Articulo[] = [];
  usuarioService          : UsuarioService;
  articuloDetalleService  : ArticuloDetalleService;
  urlImagenes             : string = Constantes.URL_IMAGEN;

  constructor(usuarioService: UsuarioService, articuloDetalleService: ArticuloDetalleService) {
    this.articuloDetalleService = articuloDetalleService;
    this.usuarioService = usuarioService;
  }

  ngOnInit() {
    if(localStorage.getItem("_arts")){
      this.listaCarrito = localStorage.getItem("_arts").split(' ');
      for(var i = 0; i < this.listaCarrito.length; i++){
        this.articuloDetalleService.getArticulo(this.listaCarrito[i]).subscribe( res =>{
          var articulos = res as Articulo[];
          this.listaArticulos.push(articulos[0]);
        });
      }
    }
  }

  mostrardivenvio() {
    if (document.getElementById("listaenvio").style.display == "block") {
      document.getElementById("listaenvio").style.display = "none";
    } else {
      document.getElementById("listaenvio").style.display = "block";
    }
  }

  mostrardivcupon() {
    if (document.getElementById("seltcupon").style.display == "block") {
      document.getElementById("seltcupon").style.display = "none";
    } else {
      document.getElementById("seltcupon").style.display = "block";
    }
  }

  eliminaritem(url: string) {
    this.usuarioService.eliminarArticuloCarrito(url,localStorage.getItem("_tk")).subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        var posicion = this.listaCarrito.indexOf(url);
        this.listaCarrito.splice(posicion, 1);
        this.listaArticulos.splice(posicion, 1);
      }else{
        console.log(jres.error);
      }
    });
    this.mencart();
  }

  eliminartodo(){
    this.usuarioService.eliminarArticulosCarrito(localStorage.getItem("_tk")).subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      if( jres.status){
        localStorage.removeItem("_arts");
        this.listaArticulos = [];
      } else {
        console.log(jres.error);
      }
    });
    this.mencart();
  }

  mencart(){
    if(this.listaArticulos==null){
      document.getElementById('mencartvacio').style.display=('block');
      document.getElementById('listacartarticulos').style.display=('none');
    }
  }
}
