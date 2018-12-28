import { Articulo } from './../articulo-detalle/articulo';
import { Injectable } from '@angular/core';
import {ArticulosbusquedaComponent} from './articulosbusqueda.component';
import {MenuComponent} from '../menu/menu.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServicioapoyoService {
articulobus:ArticulosbusquedaComponent;
menuart:MenuComponent;
router:Router;
  constructor() { }

  public actualizarpag(dat:string){
    location.reload();
    //this.menuart.bus(dat);
   // this.router.navigateByUrl('busqueda/'+dat)
   //this.router.navigate(['busqueda/'+dat]);
  }
}
