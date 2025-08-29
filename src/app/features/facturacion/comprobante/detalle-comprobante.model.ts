import { Comprobante } from "./comprobante.model";

export interface MetodoPago {
    id: number;
    descripcion: string;
}

export interface DetalleComprobante {
  idDetalleComprobante: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  comprobante: Comprobante;
  metodoPago: MetodoPago;
}