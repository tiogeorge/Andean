import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

export interface NombreDirec {
  nombre: string;
}

export interface Años {
  value: string;
  viewValue: string;
}
export interface Mes {
  value: string;
  viewValue: string;
}
export interface Tipolocalenvio {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})

export class PagoComponent implements OnInit {
  localselec:string='Tipo1';
  //stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //fin stepper
  //nombreicondir
  nombreicondir:string='add';
  nombreiconselec:string='cancel';
  //finnombre
  //chips
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  fruits: NombreDirec[] = [
    {nombre: 'Direccion1'},
  ];
  //
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({nombre: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  direccionselec(id:string){
    document.getElementById(id).style.background='#FFBF00';
    document.getElementById(id).style.color='white';
  }
  remove(fruit: NombreDirec): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
  //fin chips
  Local: Tipolocalenvio[] = [
    { value: 'Tipo1', viewValue: 'Casa' },
    { value: 'Tipo2', viewValue: 'Oficina' },
    { value: 'Tipo3', viewValue: 'Departamento' },
    { value: 'Tipo4', viewValue: 'Edificio' },
    { value: 'Tipo5', viewValue: 'Condominio' },
    { value: 'Tipo16', viewValue: 'Otro' }
    
  ];
  Anhos: Años[] = [
    { value: '2018', viewValue: '2018' },
    { value: '2019', viewValue: '2019' },
    { value: '2020', viewValue: '2020' },
    { value: '2021', viewValue: '2021' },
    { value: '2022', viewValue: '2022' },
    { value: '2023', viewValue: '2023' },
    { value: '2024', viewValue: '2023' }
  ];
  mes: Mes[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
    { value: '6', viewValue: '6' },
    { value: '7', viewValue: '7' },
    { value: '8', viewValue: '8' },
    { value: '9', viewValue: '9' },
    { value: '10', viewValue: '10' },
    { value: '11', viewValue: '11' },
    { value: '12', viewValue: '12' }
  ];

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    //stepps
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    //fin stepps
  //  document.getElementById('datostarjeta').hidden = true;
    //document.getElementById('Agregardireccion').hidden = true;
  }
  mostrarform(value: string) {
    console.log(value);
    if (value == '1') {
      if (document.getElementById('datostarjeta').hidden == true) {
        document.getElementById('datostarjeta').hidden = false;
      }
      else{
        document.getElementById('datostarjeta').hidden = true;
      }
    }
    if (value == '2') {
      document.getElementById('datostarjeta').hidden = true;
    }
    if (value == '3') {
      document.getElementById('datostarjeta').hidden = true;
    }
   
  }
  mostrarformdir() {
    if (document.getElementById('Agregardireccion').hidden == true) {
      document.getElementById('Agregardireccion').hidden = false;
      this.nombreicondir='arrow_drop_down';
    }
    else{
      document.getElementById('Agregardireccion').hidden = true;
      this.nombreicondir='add';
    }
  }

}
