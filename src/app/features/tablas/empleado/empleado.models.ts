export interface Distrito {
  id: number;
  descripcion: string;
  provincia: Provincia;
}

export interface Provincia {
  id: number;
  descripcion: string;
  departamento: Departamento;
}

export interface Departamento {
  id: number;
  descripcion: string;
}

export interface CargoEmpleado {
  id: number;
  descripcion: string;
}

/** El modelo principal Empleado según tu entidad Java */
export interface Empleado {
  id: number;
  codigo: string;       // CHAR(6)
  nombre: string;       // varchar(100)
  apellido: string;     // varchar(100)
  dni?: string;         // nullable, único
  telefono?: string;    // nullable
  estado: boolean;      // true = activo, false = inactivo
  distrito: Distrito;   // relación ManyToOne
  cargo: CargoEmpleado; // relación ManyToOne
}

