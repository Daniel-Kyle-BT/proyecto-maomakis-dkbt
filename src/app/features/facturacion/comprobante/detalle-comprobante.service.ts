import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleComprobante } from './detalle-comprobante.model';

@Injectable({ providedIn: 'root' })
export class DetalleComprobanteService {
  private http = inject(HttpClient);

  constructor(@Inject('APP_CONFIG') private config: any) {}

  // 🔹 Listar detalles por comprobante
  listarPorComprobante(idComprobante: number): Observable<DetalleComprobante[]> {
    return this.http.get<DetalleComprobante[]>(
      `${this.config.apiUrl}/detalle-comprobante/${idComprobante}`
    );
  }

  // 🔹 Buscar un detalle por ID
  obtener(id: number): Observable<DetalleComprobante> {
    return this.http.get<DetalleComprobante>(
      `${this.config.apiUrl}/detalle-comprobante/buscar/${id}`
    );
  }

  // 🔹 Crear detalle
  crear(detalle: Partial<DetalleComprobante>): Observable<DetalleComprobante> {
    return this.http.post<DetalleComprobante>(
      `${this.config.apiUrl}/detalle-comprobante`,
      detalle
    );
  }

  // 🔹 Actualizar detalle
  actualizar(id: number, detalle: Partial<DetalleComprobante>): Observable<DetalleComprobante> {
    return this.http.put<DetalleComprobante>(
      `${this.config.apiUrl}/detalle-comprobante/${id}`,
      detalle
    );
  }

  // 🔹 Eliminar detalle
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.config.apiUrl}/detalle-comprobante/${id}`
    );
  }
}