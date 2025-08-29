// features/tablas/pedido/pedido.model.ts
export interface Estado {
  idEstado: number;
  descripcion: string;
}

export interface TipoPedido {
  idTipoPedido: number;
  descripcion: string;
}

export interface Cargo {
  id: number;
  descripcion: string;
}

export interface Distrito {
  id: number;
  descripcion: string;
  provincia: {
    id: number;
    descripcion: string;
    departamento: {
      id: number;
      descripcion: string;
    }
  }
}

export interface Empleado {
  id: number;
  codigo: string;
  nombre: string;
  apellido: string;
  dni: string;
  cargo: Cargo;
  distrito: Distrito;
  telefono: string;
  estado: boolean;
}

export interface Sucursal {
  id: number;
  codigo: string;
  nombre: string;
  distrito: Distrito;
  telefono: string;
  pais: string;
  estado: Estado;
}

export interface Mesa {
  id: number;
  numeroMesa: number;
  capacidad: number;
  sucursal: Sucursal;
  estado: Estado;
}

export interface Cliente {
  id: number;
  codigo: string;
  nombre: string;
  apellido: string;
  telefono: string;
  fechaRegistro: string;
  estado: boolean;
}

export interface Direccion {
  idDireccion: number;
  cliente: Cliente;
  distrito: Distrito;
  direccionDetallada: string;
  referencia: string;
  etiqueta: string;
}

export interface Pedido {
  idPedido: number;
  tipoPedido: TipoPedido;
  empleado: Empleado;
  mesa?: Mesa | null;
  direccion?: Direccion | null;
  fechaInicio: string;
  fechaFin?: string | null;
  fechaEntrega?: string | null;
  total: number;
  estado: Estado;
}
