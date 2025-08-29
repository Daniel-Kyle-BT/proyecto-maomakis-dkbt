// features/tablas/sucursal/sucursal.models.ts
import { Distrito } from '@shared/models/ubicacion.model';
import { Estado } from '@shared/models/estado.model';

export interface Sucursal {
  id: number;
  codigo: string;
  nombre: string;
  distrito: Distrito;
  telefono: string;
  pais: string;
  estado: Estado;
}