import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  status: string;
  mensaje: string;
}

@Component({
  selector: 'app-dialogo-carrito',
  template: `
    <h2 mat-dialog-title>{{data.mensaje}}</h2>
    <div mat-dialog-content>
      <p>HOLA MUNDO CRUEL</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button color="primary" routerLink="/cart" cdkFocusInitial>IR AL CARRITO</button>
      <button mat-raised-button color="accent" (onClick)="seguirComprando()">Seguir Comprando</button>
    </div>
  `,
  styles: []
})
export class DialogoCarritoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogoCarritoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  seguirComprando(): void {
    console.log('si funciona');
    this.dialogRef.close();
  }

}
