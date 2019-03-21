import { CardService } from './card.service';
import { Component, OnInit } from '@angular/core';
import { Constantes } from '../constantes';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css','./carouselmultiple.css']
})
export class PortafolioComponent implements OnInit {
  listarcardtipo1: any;
  listarcardtipo2: any;
  listarcardtipo3: any;
  constructor(public cardservice: CardService , public router: Router) { }
  URL_IMAGENES = Constantes.URL_IMAGEN_MD;
  URL_IMAGEN = Constantes.URL_IMAGEN;
  banners : any[] = new Array();
  bannerPrincipal: any ;

  ngOnInit() {
    this.bannerPrincipal =  {
      _id:'0',
      imagen:'sinimagen.webp'
    };
    this.obtenercard();   
    this.obtenerBanner();
  }

  abrirArticulo(url){
    this.router.navigate(['/articulo/'+url])
    console.log("IR A : "+url);
  }
  
  obtenerBanner(){
    this.cardservice.obtenerBanners().subscribe(res=>{
      this.banners = res as any[];
      this.bannerPrincipal = this.banners[0];
      this.banners.splice(0,1);
      var cont = document.getElementById("indicadores-carousel-grande");
      cont.innerHTML = " <li data-target='#carousel-example-2' data-slide-to='0' class='active'></li>";
      for(var i = 0;i<this.banners.length;i++){
        cont.innerHTML = cont.innerHTML + "<li data-target='#carousel-example-2' data-slide-to='"+(i+1)+"'></li>"
      }
      console.log(this.bannerPrincipal);

    });
  }
  obtenercard() {
    var tipo1 = 'Equipo';
    var tipo2 = 'Plan';
    var tipo3 = 'Accesorio';
    this.listarcardtipo1=new Array();
    this.cardservice.obtenercard(tipo1)
      .subscribe(res => {
        console.log(res);
        var resp = JSON.parse(JSON.stringify(res));
        this.listarcardtipo1=resp;
        console.log('entra');
        console.log(this.listarcardtipo1);
      });
    this.cardservice.obtenercard(tipo2)
      .subscribe(res => {
        var resp2 = JSON.parse(JSON.stringify(res));
        this.listarcardtipo2=resp2;
        console.log('entra');
        console.log(this.listarcardtipo2);
      });
    this.cardservice.obtenercard(tipo3)
      .subscribe(res => {
        var resp3 = JSON.parse(JSON.stringify(res));
        this.listarcardtipo3=resp3;
        console.log('entra');
        console.log(this.listarcardtipo3);
      });
  }
}
