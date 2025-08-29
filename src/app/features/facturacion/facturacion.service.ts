import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../pedidos/pedido.model';
import { Comprobante } from './comprobante/comprobante.model';

interface ComprobanteFiltros {
  idPedido?: number;
  idCliente?: number;
  idEmpleado?: number;
  idCaja?: number;
  idEstado?: number;
  fechaInicio?: string;
  fechaFin?: string;
}

@Injectable({ providedIn: 'root' })
export class FacturacionService {
  private http = inject(HttpClient);

  constructor(@Inject('APP_CONFIG') private config: any) {}

  // PEDIDOS

  listarPedidosEmitidos(): Observable<Pedido[]> {
    const params = new HttpParams().set('idEstado', '3');
    return this.http.get<Pedido[]>(`${this.config.apiUrl}/pedidos/filtro`, { params });
  }

  obtenerPedido(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.config.apiUrl}/pedidos/${id}`);
  }

  // COMPROBANTES

  listarComprobantes(): Observable<Comprobante[]> {
    return this.http.get<Comprobante[]>(`${this.config.apiUrl}/comprobantes`);
  }

  obtenerComprobante(id: number): Observable<Comprobante> {
    return this.http.get<Comprobante>(`${this.config.apiUrl}/comprobantes/${id}`);
  }

  crearComprobante(comprobante: Partial<Comprobante>): Observable<Comprobante> {
    return this.http.post<Comprobante>(`${this.config.apiUrl}/comprobantes`, comprobante);
  }

  actualizarComprobante(id: number, comprobante: Partial<Comprobante>): Observable<Comprobante> {
    return this.http.put<Comprobante>(`${this.config.apiUrl}/comprobantes/${id}`, comprobante);
  }

  eliminarComprobante(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/comprobantes/${id}`);
  }

  buscarComprobantes(filtros: ComprobanteFiltros): Observable<Comprobante[]> {
    let params = new HttpParams();

    if (filtros.idPedido != null) params = params.set('idPedido', filtros.idPedido.toString());
    if (filtros.idCliente != null) params = params.set('idCliente', filtros.idCliente.toString());
    if (filtros.idEmpleado != null) params = params.set('idEmpleado', filtros.idEmpleado.toString());
    if (filtros.idCaja != null) params = params.set('idCaja', filtros.idCaja.toString());
    if (filtros.idEstado != null) params = params.set('idEstado', filtros.idEstado.toString());
    if (filtros.fechaInicio != null) params = params.set('fechaInicio', filtros.fechaInicio);
    if (filtros.fechaFin != null) params = params.set('fechaFin', filtros.fechaFin);

    return this.http.get<Comprobante[]>(`${this.config.apiUrl}/comprobantes/filtro`, { params });
  }
}
