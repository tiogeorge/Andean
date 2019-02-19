import { CardService } from './card.service';
import { Component, OnInit } from '@angular/core';
import { Constantes } from '../constantes';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  listarcardtipo1: any;
  listarcardtipo2: any;
  listarcardtipo3: any;
  constructor(public cardservice: CardService) { }
  URL_IMAGENES = Constantes.URL_IMAGEN_MD;

  ngOnInit() {
    this.obtenercard();
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
