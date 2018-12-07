import { LoginComponent } from './../login/login.component';
import { Router } from '@angular/router';
import { Usuario } from './../perfil-usuario/usuario';
import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {MAT_STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { DireccionService } from './direccion.service';
import { Direccion } from './direccion';
import { UsuarioService } from '../perfil-usuario/usuario.service';


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
}
@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  },DireccionService],
  encapsulation: ViewEncapsulation.None,
})

export class PagoComponent implements OnInit {
  usuario:Usuario;
  usuarioService: UsuarioService;
  router: Router;
  user:string='';
  listdirecciones: string[];
  localselec:string='Casa';
  RespuestaDir:any;
  //stepper
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  //fin stepper
  //nombreicondir
  nombreicondir:string='add';
  nombreiconselec:string='cancel';
  nombreicontipo='home';
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
    { value: 'Casa' },
    { value: 'Oficina' },
    { value: 'Departamento' },
    { value: 'Edificio' },
    { value: 'Condominio' },
    { value: 'Otro' }
    
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

  constructor(private _formBuilder: FormBuilder, private direccionService:DireccionService,usuarioService: UsuarioService, router: Router ) {
    this.usuarioService = usuarioService;
    this.router = router;
   }

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
    //recuperar usuario
    this.usuarioService.getUsuarioLogeado(localStorage.getItem("_tk")).subscribe(res =>{
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        this.usuario = jres.data as Usuario;
        console.log(this.usuario._id);
        this.user=this.usuario._id;
        console.log(this.user);
        this.direccionService.selecDireccion.usuario=this.usuario._id;
        this.ListarDireccion(this.usuario._id.toString());
      }else{
        this.router.navigate(['/']);
      }
    });
    //fin recuperar
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

  //funciones
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.direccionService.selecDireccion=new Direccion();
    }
  }
  AgregarDireccion(form:NgForm){
    this.direccionService.AgregarDireccion(this.direccionService.selecDireccion)
    .subscribe(res =>{
      console.log(res);
      this.resetForm(form);
      console.log('Direccion Agregada')
      this.ListarDireccion(this.usuario._id);
    });
  }
  ListarDireccion(id:string){
    this.direccionService.ListarDireccion(id)
    .subscribe(res=>{
      //
     var Respuesta=JSON.parse(JSON.stringify(res));
      for(var i=0;i<Object.keys(res).length;i++){
       /* this.Fnombreicondirec(Respuesta[i].tipolocal);
        console.log(Respuesta[i].tipolocal);*/
        if(Respuesta[i].tipolocal=='Casa'){
         Respuesta[i].nombreicon='home';
        }
        if(Respuesta[i].tipolocal=='Oficina'){
          Respuesta[i].nombreicon='business_center';
        }
        if(Respuesta[i].tipolocal=='Departamento'){
          Respuesta[i].nombreicon='store_mall_directory';
        }
        if(Respuesta[i].tipolocal=='Edificio'){
          Respuesta[i].nombreicon='domain';
        }
        if(Respuesta[i].tipolocal=='Condominio'){
          Respuesta[i].nombreicon='location_city ';
        }
        if(Respuesta[i].tipolocal=='Otro'){
          Respuesta[i].nombreicon='landscape';
        }
        
      }
      this.direccionService.direccion=Respuesta as Direccion[];
    });
   
  }

}
