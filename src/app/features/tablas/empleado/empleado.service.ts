// features/tablas/empleado/empleado.service.ts
import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './empleado.models';


interface EmpleadoFiltros {
  idCargo?: number;
  idDistrito?: number;
  idProvincia?: number;
  idDepartamento?: number;
  estado?: boolean;
}

@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private http = inject(HttpClient);
  constructor(@Inject('APP_CONFIG') private config: any) {}

 listar(filtros: EmpleadoFiltros): Observable<Empleado[]> {
    let params = new HttpParams();

    if (filtros.idCargo != null) {
      params = params.set('idCargo', filtros.idCargo.toString());
    }
    if (filtros.idDistrito != null) {
      params = params.set('idDistrito', filtros.idDistrito.toString());
    }
    if (filtros.idProvincia != null) {
      params = params.set('idProvincia', filtros.idProvincia.toString());
    }
    if (filtros.idDepartamento != null) {
      params = params.set('idDepartamento', filtros.idDepartamento.toString());
    }
    if (filtros.estado != null) {
      params = params.set('estado', filtros.estado.toString());
    }
    return this.http.get<Empleado[]>(`${this.config.apiUrl}/empleados`,{ params });
  }

  cambiarEstado(id: number, nuevoEstado: boolean): Observable<void> {
    // enviar body {} en vez de null para no romper options.params en algunos entornos
    return this.http.patch<void>(
      `${this.config.apiUrl}/empleados/${id}/estado`,
      {}, // <- importante
      { params: { nuevoEstado: String(nuevoEstado) } }
    );
  }
  crear(empleado: Partial<Empleado>): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.config.apiUrl}/empleados`, empleado);
  }

  obtener(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.config.apiUrl}/empleados/${id}`);
  }

  actualizar(id: number, empleado: Partial<Empleado>): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.config.apiUrl}/empleados/${id}`, empleado);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/empleados/${id}`);
  }
}
