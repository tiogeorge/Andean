import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from './region';
import { Provincia } from './provincia';

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

  postRegion(region : Region){
    return this.http.post(this.URL_API, region, {withCredentials: true});
  }

  getRegiones(){
    return this.http.get(this.URL_API, {withCredentials: true});
  }

  putRegion(region: Region){
    return this.http.put(this.URL_API + `/${region._id}`, region, {withCredentials: true});
  }

  deleteRegion(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`, {withCredentials: true});
  }

  setDepartamentoSelected(departamento: string){
    if(departamento != '1'){
      var i = 0;
      while(this.regiones[i].departamento != departamento){ i++; }
      this.departamentoSelected = this.regiones[i];
    }
    this.provinciaSelected = new Provincia();
  }

  setProvinciaSelected(provincia: string){
    if(provincia != '1'){
      var i = 0;
      while(this.departamentoSelected.provincias[i].provincia != provincia) { i++;}
      this.provinciaSelected = this.departamentoSelected.provincias[i];
    } else {
      this.provinciaSelected = new Provincia();
    }
  }

  setDistritoSelected(distrito: string){
    if(distrito != '1'){
      var i = 0;
      while(this.provinciaSelected.distritos[i] != distrito){ i++; }
      this.distritoSelected = this.provinciaSelected.distritos[i]; 
    }
  }
}