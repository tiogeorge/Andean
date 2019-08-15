import { CardService } from './card.service';
import { MarcaService} from '../marca/marca.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Constantes } from '../constantes';
//import * as $ from 'jquery';
import { Router } from '@angular/router';
import './owl.carousel.min.js';
import { Respuesta } from '../perfil-usuario/respuesta';
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
  constructor(public cardservice: CardService ,public marcaService:MarcaService, public router: Router) { }
  URL_IMAGENES = Constantes.URL_IMAGEN_LG ;
  URL_IMAGEN = Constantes.URL_IMAGEN;
  banners : any[] = new Array();
  bannerPrincipal: any ;
  marcas: any[] = new Array();
  mostrarCargandoOfertas = false;

  @ViewChildren('carouselofertas') carouselofertas: QueryList<any>;
  @ViewChildren('carouselaccesorios') carouselaccesorios: QueryList<any>;
  @ViewChildren('carouselmarcas') carouselmarcas: QueryList<any>;
  @ViewChildren('carouselbanners') carouselbanners: QueryList<any>;
  ngOnInit() {
    this.bannerPrincipal =  {
      _id:'0',
      imagen:'sinimagen.webp'
    };
    this.obtenerBanner();    
  }
  ngAfterViewInit() {   
    
  }
  

  abrirArticulo(url){
    this.router.navigate(['/articulo/'+url])
  }
  obtenerMarcas(){
    this.marcaService.obtenerMarcas().subscribe(res=>{
      this.marcas = res as any[];
      
    
    this.carouselmarcas.changes.subscribe(t => {      
      this.iniciarCarouselMarcas();     
    });
    });
  }
  obtenerBanner(){
    this.cardservice.obtenerBanners().subscribe(res=>{
      this.banners = res as any[];
      var content = "";
      this.carouselbanners.changes.subscribe(t => {         
        $("#carousel-grande-owl").owlCarousel({
          loop:true,
          autoplay:true,
          margin:1,
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
      

      this.obtenerMarcas();
      this.obtenercard();   
    });
  }
  iniciarCarousel(){
    $("#owl-demo-ofertas").owlCarousel({
      loop:false,
      margin:10,
      autoplay:false,
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
            autoWidth:false
          },
          600:{
              items:3,
              nav:false,
              dots:false
          },
          1000:{
              items:5,
              nav:true,
              dots:false,              
              autoWidth:true
          }
      }
    });
    
  }

  iniciarCarouselOfertas(){
    $("#owl-demo-ofertas2").owlCarousel({
      loop:true,
      margin:15,
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
      autoplay:false,
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

  iniciarCarouselMarcas(){
    $("#owl-demo-marcas").owlCarousel({
      loop:true,
      margin:5,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      lazyLoad:true,
      responsiveClass:true,
      nav:true,
      dots:true,
      responsive:{
          0:{
              items:2,
              nav:true,
              dots:false,
          },
          600:{
              items:4,
              nav:true,
              dots:false
          },
          1000:{
              items:8,
              nav:true,
              dots:false
          }
      }
    });
  }

  /**
   * Método que obtiene los carteles de equipos y de accesorios
   */
  obtenercard() {
    this.mostrarCargandoOfertas = true;
    this.cardservice.obtenerCarteles().subscribe( res => {
      this.mostrarCargandoOfertas = false;
      const rspta = res as Respuesta;
      if(rspta.status){
        this.listaofertas = rspta.data;
        this.listaaccesorios = rspta.data2;
        console.log(rspta.data);
      }
      this.carouselofertas.changes.subscribe(t => {         
        this.iniciarCarousel();     
      });
      this.carouselaccesorios.changes.subscribe(t => {      
        this.iniciarCarouselAccesorios();     
      });
    });
  }
}
