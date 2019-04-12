export class Respuesta {

  constructor(status = false, msg = '', error = '', data : any, user: any) {
    this.status = status;
    this.msg = msg;
    this.error = error;
    this.data = data;
    this.user = user;
  }

  status  : boolean;
  msg     : string;
  error   : string;
  data    : any;
  data2   : any;
  user    : any;
}