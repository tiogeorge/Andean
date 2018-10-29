export class Usuario {

  constructor(_id = '', correo = '', nombres = '', apellidos = '', contrasena = '') {
      this._id = _id;
      this.correo = correo;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.contrasena = contrasena;
  }

  _id: string;
  correo: string;
  nombres: string;
  apellidos: string;
  contrasena: string;
}