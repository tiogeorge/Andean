import { Articulo } from '../articulo';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  status: string;
  mensaje: string;
  urlImagen: string;
  articulo: Articulo;
}

@Component({
  selector: 'app-dialogo-carrito',
  templateUrl: './dialogo-carrito.component.html',
  styleUrls: ['./dialogo-carrito.component.css']
})
export class DialogoCarritoComponent implements OnInit {
  urlImg : string;
  router: Router;

  constructor(public dialogRef: MatDialogRef<DialogoCarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, router: Router) {
      this.urlImg = data.urlImagen + '/tmp/' + data.articulo.imagenes[0];
      this.router = router;
     }

  ngOnInit() {
  }

  irAlCarrito(): void{
    this.dialogRef.close();
    this.router.navigate(['/cart']);
  }

  seguirComprando(): void {
    this.dialogRef.close();
  }

}
