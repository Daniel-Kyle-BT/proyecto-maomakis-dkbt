// features/tablas/mesa/mesa.models.ts
import { Estado } from '@shared/models/estado.model';
import { Sucursal } from '../sucursal/sucursal.model';

export interface Mesa {
  id: number;
  numeroMesa: number;
  capacidad: number;
  sucursal: Sucursal;
  estado: Estado;
}