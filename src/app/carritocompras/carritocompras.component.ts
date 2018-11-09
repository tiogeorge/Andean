import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carritocompras',
  templateUrl: './carritocompras.component.html',
  styleUrls: ['./carritocompras.component.css']
})
export class CarritocomprasComponent implements OnInit {

  listaarticuloscart: string[] = ['Articulo 1', 'Artiulo 2', 'Articulo 3'];
  constructor() { }

  ngOnInit() {
  }
  mostrardivenvio(){
    if(document.getElementById('listaenvio').style.display == 'block'){
      document.getElementById('listaenvio').style.display = 'none';
    }
    else{
      document.getElementById('listaenvio').style.display = 'block';
    }
  }
  mostrardivcupon(){
    if(document.getElementById('seltcupon').style.display == 'block'){
      document.getElementById('seltcupon').style.display = 'none';
    }
    else{
      document.getElementById('seltcupon').style.display = 'block';
    }
  }
}
