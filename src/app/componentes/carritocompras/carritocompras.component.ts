import { Articulo } from '../articulo-detalle/articulo';
import { ArticuloDetalleService } from '../articulo-detalle/articulo-detalle.service';
import { Constantes } from '../constantes';
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from '@angular/material';
import { Region } from '../perfil-usuario/region';
import { RegionService } from '../perfil-usuario/region.service';
import { Respuesta } from '../perfil-usuario/respuesta';
import { Router } from '@angular/router';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: "app-carritocompras",
  templateUrl: "./carritocompras.component.html",
  styleUrls: ["./carritocompras.component.css"]
})
export class CarritocomprasComponent implements OnInit {
  listaArticulos: any[] = [];
  urlImagenes : string = Constantes.URL_IMAGEN;
  cargando : boolean;
  mostrarArticulos: boolean = true;
  mostrarEnvio: boolean = false;
  mostrarCupon: boolean = false;
  tituloEliminar: string = '';
  alturaImg: string;
  subtotal: number = 0;
  envio: number = 10;

  constructor(public usuarioService: UsuarioService, public articuloDetalleService: ArticuloDetalleService, public regionService: RegionService, public snackBar: MatSnackBar, public router: Router) {}

  ngOnInit() {
    this.responsivo(); // verificar la pantalla del dispositivo
    this.cargando = true;
    this.obtenerArticulosCarrito();    
  }

  obtenerArticulosCarrito(){
    if(this.usuarioService.logueado()){
      this.cargando = true;
      this.articuloDetalleService.getCarrito().subscribe(res => {
        const respuesta = res as Respuesta;
        if (respuesta.status) {
          this.listaArticulos = respuesta.data as any[];
          this.mostrarArticulos = true;
          this.subtotal = this.calcularSubTotal();
        }
        this.cargando = false;
      });
      this.mostrarArticulos = !(this.listaArticulos.length == 0);
    }else{
      this.listaArticulos = JSON.parse(localStorage.getItem("cart"));
      this.mostrarArticulos = true;
      this.subtotal = this.calcularSubTotal();
      this.cargando = false;
    }
    
  }

  /**
   * Método que calcula el costo de envío del producto
   */
  calcularEnvio(): void {
    this.openSnackBar(true, 'Calculando el envío');
  }

  /**
   * Método que calcula el subtotal de venta de un carrito de compras
   */
  calcularSubTotal() :number{
    var sub = 0;
    for(var i = 0; i < this.listaArticulos.length; i++){
      sub += (this.listaArticulos[i].precio - this.listaArticulos[i].precio * this.listaArticulos[i].descuento / 100);
    }
    return sub;
  }

  /**
   * Método que elimina un determinado artículo de un carrito
   * @param url identificador de un artículo
   */
  eliminaritem(id: string): void {
    this.usuarioService.eliminarArticuloCarrito(id).subscribe(res => {
      const respuesta = res as Respuesta;
      if (respuesta.status) {
        // Buscar la posición del artículo eliminado
        var i = 0; 
        while(i < this.listaArticulos.length && this.listaArticulos[i].id != id){ i++; }
        this.listaArticulos.splice(i, 1);
        this.openSnackBar(respuesta.status, respuesta.msg);
      } else {
        this.openSnackBar(respuesta.status, respuesta.error);
      }
      this.subtotal = this.calcularSubTotal();
    });
    this.mostrarArticulos = !(this.listaArticulos.length == 0);
  }

  /**
   * Método para eliminar todos los artículos de un carrito de compras
   */
  eliminartodo() :void{
    this.usuarioService.eliminarArticulosCarrito().subscribe(res => {
      const respuesta = res as Respuesta;
      if (respuesta.status) {
        this.listaArticulos = [];
        this.openSnackBar(respuesta.status, respuesta.msg);
      } else {
        this.openSnackBar(respuesta.status, respuesta.error);
      }
      this.subtotal = this.calcularSubTotal();
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
   * Método que muestra un Bar temporal para confirmar los mensajes de éxito y de error
   */
  openSnackBar(status: boolean, mensaje: string): void {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      panelClass: [status ? 'exito' : 'error'],
      data: mensaje
    });
  }

  /**
   * Método que guarda el precio de envío y lo almacena en la sesión del usuario
   */
  procesarCompra(): void {
    this.usuarioService.guardarCostoEnvio({envio: this.envio}).subscribe( res => {
      const respuesta = res as Respuesta;
      if(respuesta.status){
        this.openSnackBar(respuesta.status, respuesta.msg);
        this.router.navigate(['/pago']);
      } else {
        this.openSnackBar(respuesta.status, respuesta.error);
      }
    });
  }

  /**
   * Método para cambiar las imágenes en relación al tamaño de las pantallas.
   */
  responsivo(): void {
    if (screen.width < 576) {
      this.alturaImg = "75px";
    } else if (screen.width < 768) {
      this.alturaImg = "75px";
    } else if (screen.width < 992) {
      this.alturaImg = "100px";
      this.tituloEliminar = 'ELIMINAR TODO';
    } else if (screen.width < 1200) {
      this.alturaImg = "125px";
      this.tituloEliminar = 'ELIMINAR TODO';
    } else {
      this.alturaImg = "150px";
      this.tituloEliminar = 'ELIMINAR TODO';
    }
  }    

  enProceso(){
    this.openSnackBar(false, 'Lo sentimos, esta opción todavia no está disponible');
  }
}