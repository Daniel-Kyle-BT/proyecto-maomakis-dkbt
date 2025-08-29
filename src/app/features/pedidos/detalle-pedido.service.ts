import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallePedido } from './detalle-pedido.model';

@Injectable({ providedIn: 'root' })
export class DetallePedidoService {
  private http = inject(HttpClient);
  constructor(@Inject('APP_CONFIG') private config: any) {}

  crear(detalle: Partial<DetallePedido>): Observable<DetallePedido> {
    return this.http.post<DetallePedido>(`${this.config.apiUrl}/detalles-pedido`, detalle);
  }

  obtener(idPedido: number, idPlatillo: number): Observable<DetallePedido> {
    return this.http.get<DetallePedido>(
      `${this.config.apiUrl}/detalles-pedido/${idPedido}/${idPlatillo}`
    );
  }

  actualizar(idPedido: number, idPlatillo: number, detalle: Partial<DetallePedido>): Observable<DetallePedido> {
    return this.http.put<DetallePedido>(
      `${this.config.apiUrl}/detalles-pedido/${idPedido}/${idPlatillo}`,
      detalle
    );
  }

  eliminar(idPedido: number, idPlatillo: number): Observable<void> {
    return this.http.delete<void>(
      `${this.config.apiUrl}/detalles-pedido/${idPedido}/${idPlatillo}`
    );
  }
}
