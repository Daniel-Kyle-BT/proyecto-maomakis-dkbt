import { Pedido } from './pedido.model';
import { Menu } from '../tablas/menu/menu.model';

export interface DetallePedidoId {
  pedido: Pedido;
  menu: Menu;
}

export interface DetallePedido {
  id: DetallePedidoId;
  cantidad: number;
  subtotal: number;
}