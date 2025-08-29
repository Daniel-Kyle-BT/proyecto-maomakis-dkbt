// features/tablas/comprobante/comprobante.models.ts
import { Pedido } from '../../pedidos/pedido.model';
import { Empleado } from '../../tablas/empleado/empleado.models';
import { Caja } from '../../tablas/caja/caja.model';
import { Estado } from '@shared/models/estado.model';

export interface TipoComprobante {
  idTipoComprobante: number;
  descripcion: string;
}

export interface Comprobante {
  idComprobante: number;
  fechaEmision: string;
  precioTotalPedido: number;
  igvTotal: number;
  subTotal: number;
  tipoComprobante: TipoComprobante;
  pedido: Pedido;
  cliente: Cliente;
  empleado: Empleado;
  caja: Caja;
  estado: Estado;
}

// features/tablas/cliente/cliente.models.ts
export interface Cliente {
  id: number;
  codigo: string;
  nombre: string;
  apellido: string;
  telefono: string;
  fechaRegistro: string; // ISO date
  estado: boolean;
}