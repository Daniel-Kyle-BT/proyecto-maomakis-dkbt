// features/tablas/pedido/pedido.models.ts
import { Empleado } from '../tablas/empleado/empleado.models';
import { Mesa } from '../tablas/mesa/mesa.model';
import { Estado } from '@shared/models/estado.model';

export interface TipoPedido {
  idTipoPedido: number;
  descripcion: string;
}

export interface Pedido {
  idPedido: number;
  tipoPedido: TipoPedido;
  empleado: Empleado;
  mesa: Mesa;
  direccion: string | null;
  fechaInicio: string;
  fechaFin: string | null;
  fechaEntrega: string | null;
  total: number;
  estado: Estado;
}