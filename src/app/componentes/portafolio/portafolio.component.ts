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

  listaofertas:any;
  listaaccesorios: any;
  constructor(public cardservice: CardService , public router: Router) { }
  URL_IMAGENES = Constantes.URL_IMAGEN_MD;
  URL_IMAGEN = Constantes.URL_IMAGEN;
  banners : any[] = new Array();
  bannerPrincipal: any ;

  @ViewChildren('carouselofertas') carouselofertas: QueryList<any>;
  ngOnInit() {
    this.bannerPrincipal =  {
      _id:'0',
      imagen:'sinimagen.webp'
    };
    this.obtenercard();   
    this.obtenerBanner();
    
  }
  ngAfterViewInit() {
    this.carouselofertas.changes.subscribe(t => {
      this.iniciarCarouselAccesorios();
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
        lazyLoadEager: 1
      });
    });
  }
  iniciarCarousel(){
    $("#owl-demo-ofertas").owlCarousel({
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      lazyLoad:true,
      lazyLoadEager: 1,
      responsiveClass:true,
      responsive:{
          0:{
              items:1,
              nav:true,
              dots:false,
          },
          360:{
            items:2,
            nav:true,
            dots:false,
          },
          600:{
              items:3,
              nav:false,
              dots:false
          },
          1000:{
              items:5,
              nav:true,
              dots:false
          }
      }
    });
    
  }

  iniciarCarouselOfertas(){
    $("#owl-demo-ofertas2").owlCarousel({
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
              dots:false,
          },
          600:{
              items:3,
              nav:false,
              dots:false
          },
          1000:{
              items:5,
              nav:true,
              dots:false
          }
      }
    });
    
  }
  iniciarCarouselAccesorios(){
    $("#owl-demo-accesorios").owlCarousel({
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      lazyLoad:true,
      responsiveClass:true,
      nav:true,
      dots:true,
      responsive:{
          0:{
              items:1,
              nav:true,
              dots:true,
          },
          600:{
              items:2,
              nav:true,
              dots:true
          },
          1000:{
              items:4,
              nav:true,
              dots:true
          }
      }
    });
  }

  obtenercard() {
    var tipo1 = 'Equipo';
    var tipo2 = 'Plan';
    var tipo3 = 'Accesorio';
    this.cardservice.obtenercard(tipo1)
      .subscribe(res => {
        console.log(res);
        var resp = JSON.parse(JSON.stringify(res));
        this.listarcardtipo1=resp;
        console.log('entra');
        console.log(this.listarcardtipo1);
        this.cardservice.obtenercard(tipo3)
        .subscribe(res => {
          var resp3 = JSON.parse(JSON.stringify(res));
          this.listarcardtipo3=resp3;
          console.log('entra');
          console.log(this.listarcardtipo3);

          this.cardservice.obtenercard(tipo2)
          .subscribe(res => {
            var resp2 = JSON.parse(JSON.stringify(res));
            this.listarcardtipo2=resp2;
            console.log('entra');
            console.log(this.listarcardtipo2);


            this.listaofertas = this.listarcardtipo1;
            this.listaaccesorios = this.listarcardtipo3;
          });
        });
        

      });
        
    /*
    */
  }
}
