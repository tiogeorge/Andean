import { Injectable } from '@angular/core';
import { Card } from './card';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../constantes';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CardService {
  http: HttpClient;
  seleccard: Card;
  card: Card[];

  constructor(http: HttpClient) {
    this.http = http;
  }

  obtenerCarteles() {
    return this.http.get(Constantes.URL_API_ARTICULO + '/carteles', {withCredentials: true});
  }

  obtenercard(tipo: string) {
    return this.http.get(Constantes.URL_API_ARTICULO+"/card/card/card/"+tipo, {withCredentials: true});
  }

  obtenerBanners(){
    return this.http.get(Constantes.URL_API_ARTICULO+"/banners/banner",{withCredentials: true});
  }
}
