import { Injectable } from '@angular/core';
import {ArticulosbusquedaComponent} from './articulosbusqueda.component'

@Injectable({
  providedIn: 'root'
})
export class ServicioapoyoService {
articulobus:ArticulosbusquedaComponent;
  constructor() { }

  public actualizarpag(){
    location.reload();
    //this.articulobus.articuloslista=null;
    //alert('entra aca');
  }
}
