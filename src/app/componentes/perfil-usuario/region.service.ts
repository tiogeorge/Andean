import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Provincia } from './provincia';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  departamentoSelected : Region;
  provinciaSelected : Provincia;
  distritoSelected : string;
  regiones : Region[];
  provincias : Provincia[];
  distritos : string[];
  readonly URL_API = Constantes.URL_API_REGION;

  constructor(public http : HttpClient) {
    this.departamentoSelected = new Region();
    this.provinciaSelected = new Provincia();
  }

  /**
   * Método que eliminar una región con todo su información de provincias y distritos
   * @param _id : identificador de MongoDB para la región
   */
  deleteRegion(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`, {withCredentials: true});
  }

  /**
   * Método que obtiene todas las regiones que existen la base de datos
   */
  getRegiones(){
    return this.http.get(this.URL_API, {withCredentials: true});
  }

  /**
   * Método que guarda los datos de una nueva región
   * @param region : datos de la nueva región
   */
  postRegion(region : Region){
    return this.http.post(this.URL_API, region, {withCredentials: true});
  }

  /**
   * Método que actualiza los datos de una región
   * @param region : datos para actualizar la región
   */
  putRegion(region: Region){
    return this.http.put(this.URL_API + `/${region._id}`, region, {withCredentials: true});
  }

  /**
   * Método que selecciona un departamento
   * @param departamento : nombre del departamento seleccionado
   */
  setDepartamentoSelected(departamento: string){
    if(departamento != '1'){
      var i = 0;
      while(this.regiones[i].departamento != departamento){ i++; }
      this.departamentoSelected = this.regiones[i];
    }
    this.provinciaSelected = new Provincia();
  }

  /**
   * Método que selecciona un distrito
   * @param distrito : nombre del distrito seleccionado
   */
  setDistritoSelected(distrito: string){
    if(distrito != '1'){
      var i = 0;
      while(this.provinciaSelected.distritos[i] != distrito){ i++; }
      this.distritoSelected = this.provinciaSelected.distritos[i]; 
    }
  }

  /**
   * Método que selecciona una provincia
   * @param provincia : nombre de la provincia seleccionada
   */
  setProvinciaSelected(provincia: string){
    if(provincia != '1'){
      var i = 0;
      while(this.departamentoSelected.provincias[i].provincia != provincia) { i++;}
      this.provinciaSelected = this.departamentoSelected.provincias[i];
    } else {
      this.provinciaSelected = new Provincia();
    }
  }

  /**
   * Método que maneja los errores de los métodos
   * @param operation 
   * @param result 
   */
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}