import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../categoria/categoria.service';

@Component({
  selector: 'app-categoriahome',
  templateUrl: './categoriahome.component.html',
  styleUrls: ['./categoriahome.component.css']
})
export class CategoriahomeComponent implements OnInit {

  constructor(public categoriaservice:CategoriaService) { }

  ngOnInit() {
  }

}
