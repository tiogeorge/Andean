import { Component, OnInit, HostListener } from '@angular/core';
import { comunicacionService } from '../comunicacion.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-categorias',
  templateUrl: './menu-categorias.component.html',
  styleUrls: ['./menu-categorias.component.css']
})
export class MenuCategoriasComponent implements OnInit {
  subscription: Subscription;
  categorias:any;
  @HostListener('window:resize', ['$event'])onResize(event) {
    if(event.target.innerWidth>=750){
      this.router.navigate(['/home']);
    };
  }
  constructor(public comService: comunicacionService,public router: Router) {
    this.subscription = this.comService.getCategorias()
    .subscribe(cat => {     
      this.categorias = cat;
    });
  }

  ngOnInit() {
    if(window.innerWidth >= 750){
      this.router.navigate(['/home']);
    }
    this.comService.pedirCategorias();
  }

}
