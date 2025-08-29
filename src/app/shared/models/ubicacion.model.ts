// shared/models/ubicacion.model.ts
export interface Departamento {
  id: number;
  descripcion: string;
}
export interface Provincia {
  id: number;
  descripcion: string;
  departamento: Departamento;
}
export interface Distrito {
  id: number;
  descripcion: string;
  provincia: Provincia;
}