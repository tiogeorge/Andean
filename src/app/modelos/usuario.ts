export class Usuario {

  constructor(_id = '', correo = '', tipo_documento = '', numero_documento = '', nombres = '', apellidos = '', contrasena = '') {
      this._id = _id;
      this.correo = correo;
      this.tipo_documento= tipo_documento;
      this.numero_documento = numero_documento;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.contrasena = contrasena;
  }

  _id: string;
  correo: string;
  tipo_documento: string;
  numero_documento: string;
  nombres: string;
  apellidos: string;
  contrasena: string;
}