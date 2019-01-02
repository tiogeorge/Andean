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
    this.articuloDetalleService.getCarrito().subscribe( res => {
      var jres = JSON.parse(JSON.stringify(res));
      this.listaCarrito = jres.data;
      for(var i = 0; i < this.listaCarrito.length; i++){
        this.articuloDetalleService.getArticulo(this.listaCarrito[i]).subscribe( res => {
          this.listaArticulos.push(res[0]);
        });
      }
    });    
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
