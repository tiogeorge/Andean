import { CardService } from './card.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Constantes } from '../constantes';
//import * as $ from 'jquery';
import { Router } from '@angular/router';
import './owl.carousel.min.js';
//import * as owlCarousel from './owl.carousel.min.js';
declare var owlCarousel : any;
declare var $: any;


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

  @ViewChildren('carousel2') carousel2: QueryList<any>;


  ngOnInit() {
    this.bannerPrincipal =  {
      _id:'0',
      imagen:'sinimagen.webp'
    };
    this.obtenercard();   
    this.obtenerBanner();
    
  }
  ngAfterViewInit() {
    this.carousel2.changes.subscribe(t => {
      this.iniciarCarousel();
    });
  }
  

  abrirArticulo(url){
    this.router.navigate(['/articulo/'+url])
    console.log("IR A : "+url);
  }
  
  obtenerBanner(){
    this.cardservice.obtenerBanners().subscribe(res=>{
      this.banners = res as any[];
      var content = "";
      // poner banners
      for(var i=0; i<this.banners.length;i++){
          
        var img = this.banners[i].imagen;

        
        content += " <div class='item' routerLink='/busqueda/ban/"+this.banners[i]._id+"'><a href='/busqueda/ban/"+this.banners[i]._id+"'> <img src='"+Constantes.URL_IMAGEN_LG+"/"+img+"'"+"></a></div>"
      }
      console.log(content);
      $("#carousel-grande-owl").html(content);
      $("#carousel-grande-owl").owlCarousel({
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        items : 1,
        nav:true,
        lazyLoad : true,
      });
    });
  }
  iniciarCarousel(){
    console.log("INICIAR OWL CROSUEK");
    $("#owl-demo").owlCarousel({
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      lazyLoad:true,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              nav:true,
              loop:false,
              dots:false
          },
          600:{
              items:3,
              nav:false,
              loop:false,
              dots:false
          },
          1000:{
              items:5,
              nav:true,
              loop:false,
              dots:false
          }
      }
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

        var content = "";
        for(var i=0; i<this.listarcardtipo1.length;i++){
          
          var img = this.listarcardtipo1[i].urlImagen;
          var alt = this.listarcardtipo1[i].urlImagen;
          content += "<div class='item' <div class='simple-card noseleccionable'><div style=' width: 100%;display: flex;justify-content: center;'>"
          +"<img  style='max-height: 160px;height: auto;width: auto;margin: 3px;' src='"+Constantes.URL_IMAGEN_MD+"/"+img+"'></div>"
          +"<div style='font-size: 14px;font-weight: 430;color: #000000;'>"+this.listarcardtipo1[i].titulo
          +"</div><div style='font-size: 12px;color: rgba(0,0,0,0.5);'><del>S/ 475.00</del></div>"
          +"<div style='font-size: 16px;color: #df3b3b;font-weight: 500;'>"+this.listarcardtipo1[i].precioplan.precio+"</div></div></div>";
        }
        //console.log(content);
        //$("#owl-demo").html(content);
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
