import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../categoria/categoria.service';

@Component({
  selector: 'app-categoriahome',
  templateUrl: './categoriahome.component.html',
  styleUrls: ['./categoriahome.component.css']
})
export class CategoriahomeComponent implements OnInit {
  step = 0;
  listacategoriaspadre:any[];
  listacategoriashijos:any[];

  constructor(public categoriaservice:CategoriaService) { }

  ngOnInit() {
    this.listarcategoriasP();
  }

  listarcategoriasP(){
    this.categoriaservice.listarcategoriaspadres()
    .subscribe(res=>{
      console.log(res);
      var Respuesta = JSON.parse(JSON.stringify(res));
      this.listacategoriaspadre=Respuesta;
      console.log(this.listacategoriaspadre[1].hijos)
    });
  }
  listarcategoriashijos(id:string){
    this.categoriaservice.listarcategoriashijos(id)
    .subscribe(res=>{
      var Respuesta = JSON.parse(JSON.stringify(res));
      this.listacategoriashijos=Respuesta;
    })
   
  }

}
