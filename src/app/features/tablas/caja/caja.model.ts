// features/tablas/caja/caja.models.ts
import { Estado } from '@shared/models/estado.model';
import { Sucursal } from '../sucursal/sucursal.model';

export interface Caja {
  id: number;
  codigo: string;
  sucursal: Sucursal;
  estado: Estado;
}