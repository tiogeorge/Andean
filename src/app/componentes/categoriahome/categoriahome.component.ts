import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../categoria/categoria.service';
import { comunicacionService } from '../comunicacion.service';

@Component({
  selector: 'app-categoriahome',
  templateUrl: './categoriahome.component.html',
  styleUrls: ['./categoriahome.component.css']
})
export class CategoriahomeComponent implements OnInit {
  step = 0;
  listacategoriaspadre:any[];
  listacategoriashijos:any[];
  mostrarDetalleCategoria : boolean = false;
  listahijos:any[];

  constructor(public categoriaservice:CategoriaService, public comService: comunicacionService) { }

  ngOnInit() {
    this.listarcategoriasP();
  }

  listarcategoriasP(){
    this.categoriaservice.listarcategoriaspadres()
    .subscribe(res=>{
      //console.log(res);
      var Respuesta = JSON.parse(JSON.stringify(res));
      this.listacategoriaspadre=Respuesta;
      //console.log(this.listacategoriaspadre[1].hijos)
      this.comService.enviarCategorias(this.listacategoriaspadre);
    });
  }
  listarcategoriashijos(id:string){
    this.categoriaservice.listarcategoriashijos(id)
    .subscribe(res=>{
      var Respuesta = JSON.parse(JSON.stringify(res));
      this.listacategoriashijos=Respuesta;
    })
   
  }
  mostrarDetalle(categoriap){
    this.mostrarDetalleCategoria = true;
    this.listahijos = categoriap.hijos[0];
    //console.log(categoriap);
  }
  ocultarDetalle(){
    this.mostrarDetalleCategoria = false;
  }
  
  buscararti(id:string){
    //console.log(id);
  }

}
