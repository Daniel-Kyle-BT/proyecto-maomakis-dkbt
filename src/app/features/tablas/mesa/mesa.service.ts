// features/tablas/mesa/mesa.service.ts
import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mesa } from './mesa.model';

interface MesaFiltros {
  idSucursal?: number;
  idEstado?: number;
  numeroMesa?: number;
}

@Injectable({ providedIn: 'root' })
export class MesaService {
  private http = inject(HttpClient);
  constructor(@Inject('APP_CONFIG') private config: any) {}

  listar(filtros: MesaFiltros): Observable<Mesa[]> {
    let params = new HttpParams();

    if (filtros.idSucursal != null) {
      params = params.set('idSucursal', filtros.idSucursal.toString());
    }
    if (filtros.idEstado != null) {
      params = params.set('idEstado', filtros.idEstado.toString());
    }
    if (filtros.numeroMesa != null) {
      params = params.set('numeroMesa', filtros.numeroMesa.toString());
    }

    return this.http.get<Mesa[]>(`${this.config.apiUrl}/mesas`, { params });
  }

  cambiarEstado(id: number, idEstado: number): Observable<void> {
    return this.http.patch<void>(
      `${this.config.apiUrl}/mesas/${id}/estado`,
      {}, // importante para evitar errores en algunos entornos
      { params: { idEstado: String(idEstado) } }
    );
  }

  crear(mesa: Partial<Mesa>): Observable<Mesa> {
    return this.http.post<Mesa>(`${this.config.apiUrl}/mesas`, mesa);
  }

  obtener(id: number): Observable<Mesa> {
    return this.http.get<Mesa>(`${this.config.apiUrl}/mesas/${id}`);
  }

  actualizar(id: number, mesa: Partial<Mesa>): Observable<Mesa> {
    return this.http.put<Mesa>(`${this.config.apiUrl}/mesas/${id}`, mesa);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/mesas/${id}`);
  }
}
