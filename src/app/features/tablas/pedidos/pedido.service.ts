// features/tablas/pedido/pedido.service.ts
import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from './pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private http = inject(HttpClient);

  constructor(@Inject('APP_CONFIG') private config: any) {}

  // CRUD básico
  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.config.apiUrl}/pedidos`);
  }

  obtener(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.config.apiUrl}/pedidos/${id}`);
  }

  crear(pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.config.apiUrl}/pedidos`, pedido);
  }

  actualizar(id: number, pedido: Partial<Pedido>): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.config.apiUrl}/pedidos/${id}`, pedido);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/pedidos/${id}`);
  }

  // Filtro opcional por empleado, estado o fechas
  buscarPedidosFiltro(
    idEmpleado: number = 0,
    idEstado: number = 0,
    fechaInicio?: string,
    fechaFin?: string
  ): Observable<Pedido[]> {
    const params: any = {};
    if (idEmpleado) params.idEmpleado = idEmpleado;
    if (idEstado) params.idEstado = idEstado;
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;

    return this.http.get<Pedido[]>(`${this.config.apiUrl}/pedidos/filtro`, { params });
  }
}
