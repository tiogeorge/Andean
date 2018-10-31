export class Usuario {

  constructor(_id = '', correo = '', nombres = '', apellidos = '', password = '') {
      this._id = _id;
      this.correo = correo;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.password = password;
  }

  _id: string;
  correo: string;
  nombres: string;
  apellidos: string;
  password: string;
}