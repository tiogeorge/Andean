import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { Usuario } from '../../modelos/usuario';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {

  constructor(private servicioUsuario: UsuarioService, private router:Router) { }

  ngOnInit() {
  }

  registrar(form?: NgForm){
    console.log(form.value);
    this.servicioUsuario.post(form.value);
  }

  ir_menu(){
    this.router.navigate(['/menu']);
  }
    
}


