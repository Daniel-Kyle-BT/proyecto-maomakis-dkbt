export interface Categoria {
  id: number;
  descripcion: string;
  estado: boolean;
}

export interface Menu {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: Categoria;
  precio: number;
  tiempoPreparacion: number;
  rutaImagen: string;
  nombreImagen: string;
  fechaRegistro: string;
  estado: boolean;
}