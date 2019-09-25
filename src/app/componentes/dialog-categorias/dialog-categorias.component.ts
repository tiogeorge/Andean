import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { CategoriaService } from '../menu/categoria.service';
import { Categoria } from '../menu/categoria';
import { Constantes } from '../constantes';

@Component({
  selector: 'app-dialog-categorias',
  templateUrl: './dialog-categorias.component.html',
  styleUrls: ['./dialog-categorias.component.css']
})
export class DialogCategoriasComponent implements OnInit {

  categorias = new Array();
  mostrarCategorias = false;
  URL_IMAGES = Constantes.URL_IMAGEN_SM;

  constructor(public dialogRef: MatDialogRef<DialogCategoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public http: HttpClient, public categoriaService: CategoriaService) { }

  ngOnInit() {
    // Obtener datos de categorias
    this.obtenerCategorias();
    

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  obtenerCategorias(){
    this.mostrarCategorias=false;
    //console.log("Encima de categorias");
    if(this.categorias.length == 0){     
      //console.log("OBTENIENDO CATEGORIAS");
      this.categoriaService.getSubCategorias("root").subscribe( res => {
        this.categorias = res as Categoria[];
        this.mostrarCategorias = true;

      });
    }else{
      //caso contrario
    }
    
  }

}
