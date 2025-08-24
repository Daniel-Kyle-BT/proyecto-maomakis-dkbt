export interface Usuario  {
  username: string;
  id: number;
  codigoEmpleado: string;
  rol: Rol;
  nombreEmpleado: string;
  apellidoEmpleado: string;
}

export interface Rol {
  id: number;
  nombre: string; // ('Administrador'),
//('Supervisor'),
//('Cajero'),
//('Mesero');
}