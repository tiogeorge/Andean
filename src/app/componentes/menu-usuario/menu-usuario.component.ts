import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { comunicacionService } from '../comunicacion.service';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Subscription } from 'rxjs';
import { Route, Router } from '@angular/router';
import { MatDialog, MatSidenav } from '@angular/material';
import { DialogCategoriasComponent } from '../dialog-categorias/dialog-categorias.component';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})

export class MenuUsuarioComponent implements OnInit {
  subscription: Subscription;
  usuario:any = null;
  @Output() public sidenavToggle = new EventEmitter();

  
  constructor( public usuarioService : UsuarioService, public comService: comunicacionService, public router:Router,public dialog: MatDialog) {
    this.subscription = this.comService.getUsuario()
    .subscribe(user => {
      if(user != null){
        this.usuario =user;   
      }else{
        //NO ESTA LOGUEADO        
      }      
    });
  }

  ngOnInit() {
    this.comService.pedirUsuario();    
  }
  logout(){    
    this.usuarioService.logout();
    this.comService.enviarUsuario(null);
    location.reload(); 
  }
  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }
  openDialogCategorias(){
    this.onToggleSidenav();
    var datos = {option: "simple"}
    const dialogRef = this.dialog.open(DialogCategoriasComponent, {
      width: '98%',
      height:'80%',
      data: datos ,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
       console.log("cERRO DIALOG CATEGORIAS")
      }else{
        console.log("CANCELO");
      }
    });

  }

}
