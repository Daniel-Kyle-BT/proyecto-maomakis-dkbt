import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comprobante } from './comprobante.model';

@Injectable({ providedIn: 'root' })
export class ComprobanteService {
  private http = inject(HttpClient);
  constructor(@Inject('APP_CONFIG') private config: any) {}

  crear(comprobante: Partial<Comprobante>): Observable<Comprobante> {
    return this.http.post<Comprobante>(`${this.config.apiUrl}/comprobantes`, comprobante);
  }

  obtener(id: number): Observable<Comprobante> {
    return this.http.get<Comprobante>(`${this.config.apiUrl}/comprobantes/${id}`);
  }

  actualizar(id: number, comprobante: Partial<Comprobante>): Observable<Comprobante> {
    return this.http.put<Comprobante>(`${this.config.apiUrl}/comprobantes/${id}`, comprobante);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/comprobantes/${id}`);
  }
}