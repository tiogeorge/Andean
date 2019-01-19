import { Articulo } from '../articulo-detalle/articulo';
import { ArticuloDetalleService } from '../articulo-detalle/articulo-detalle.service';
import { Constantes } from '../constantes';
import { Component, OnInit } from "@angular/core";
import { Region } from '../perfil-usuario/region';
import { RegionService } from '../perfil-usuario/region.service';
import { Respuesta } from '../perfil-usuario/respuesta';
import { UsuarioService } from '../perfil-usuario/usuario.service';

@Component({
  selector: "app-carritocompras",
  templateUrl: "./carritocompras.component.html",
  styleUrls: ["./carritocompras.component.css"]
})
export class CarritocomprasComponent implements OnInit {
  listaArticulos: Articulo[] = [];
  listaPlanArticulo: any[] = [];
  urlImagenes: string = Constantes.URL_IMAGEN;
  mostrarArticulos: boolean = true;
  mostrarEnvio: boolean = false;
  mostrarCupon: boolean = false;
  tituloEliminar: string = '';
  alturaImg: string;
  subtotal: number = 0;
  envio: number = 0;

  constructor(public usuarioService: UsuarioService, public articuloDetalleService: ArticuloDetalleService, public regionService: RegionService) {}

  ngOnInit() {
    this.responsivo(); // verificar la pantalla del dispositivo
    this.articuloDetalleService.getCarrito().subscribe(res => {
      const respuesta = res as Respuesta;
      if (respuesta.status) {
        for (var i = 0; i < respuesta.data.length; i++) {
          this.listaArticulos.push(respuesta.data[i][0]);
          this.listaPlanArticulo.push(respuesta.data[i][1]);
          this.mostrarArticulos = true;
        }
        this.subtotal = this.calcularSubTotal();
      }
    });
    this.mostrarArticulos = !(this.listaArticulos.length == 0);
  }

  /**
   * Método que calcula el subtotal de venta de un carrito de compras
   */
  calcularSubTotal() :number{
    var sub = 0;
    for(var i = 0; i < this.listaPlanArticulo.length; i++){
      sub += this.listaPlanArticulo[i].precio;
    }
    return sub;
  }

  /**
   * Método que elimina un determinado artículo de un carrito
   * @param url identificador de un artículo
   */
  eliminaritem(url: string): void {
    this.usuarioService.eliminarArticuloCarrito(url).subscribe(res => {
      const respuesta = res as Respuesta;
      if (respuesta.status) {
        // Buscar la posición del artículo eliminado
        var i = 0; 
        while(i < this.listaArticulos.length && this.listaArticulos[i].url != url){ i++; }
        this.listaPlanArticulo.splice(i, 1);
        this.listaArticulos.splice(i, 1);
      } else {
        console.error(respuesta.error);
      }
    });
    this.mostrarArticulos = !(this.listaArticulos.length == 0);
    this.subtotal = this.calcularSubTotal();
  }

  /**
   * Método para eliminar todos los artículos de un carrito de compras
   */
  eliminartodo() :void{
    this.usuarioService.eliminarArticulosCarrito().subscribe(res => {
      const respuesta = res as Respuesta;
      if (respuesta.status) {
        this.listaArticulos = [];
        this.listaPlanArticulo = [];
      } else {
        console.error(respuesta.error);
      }
    });
    this.mostrarArticulos = !(this.listaArticulos.length == 0);
  }

  /**
   * Método que muestra los departamentos de envío en un contenedor.
   */
  mostrardivenvio() :void{
    this.regionService.getRegiones().subscribe(res => {
      this.regionService.regiones = res as Region[];
    });
    this.mostrarEnvio = this.mostrarEnvio ? false : true;
  }

  /**
   * Método para cambiar las imágenes en relación al tamaño de las pantallas.
   */
  responsivo(): void {
    if (screen.width <= 576) {
      this.alturaImg = "75px";
    } else if (screen.width <= 768) {
      this.alturaImg = "75px";
    } else if (screen.width <= 992) {
      this.alturaImg = "150px";
    } else if (screen.width <= 1200) {
      this.alturaImg = "150px";
    } else {
      this.alturaImg = "150px";
    }
  }    

}