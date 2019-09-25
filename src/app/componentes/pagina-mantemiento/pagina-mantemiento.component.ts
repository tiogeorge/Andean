import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-mantemiento',
  templateUrl: './pagina-mantemiento.component.html',
  styleUrls: ['./pagina-mantemiento.component.css']
})
export class PaginaMantemientoComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
    document.getElementById("contenedor").style.height =  window.innerHeight+"px";
  }

}
