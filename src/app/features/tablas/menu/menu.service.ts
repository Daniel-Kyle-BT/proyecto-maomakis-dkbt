// features/tablas/menu/menu.service.ts
import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class MenuService {
  private http = inject(HttpClient);

  constructor(@Inject('APP_CONFIG') private config: any) {}

  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.config.apiUrl}/menus`);
  }

  obtener(id: number): Observable<Menu> {
    return this.http.get<Menu>(`${this.config.apiUrl}/menus/${id}`);
  }

  crear(menu: Partial<Menu>): Observable<Menu> {
    return this.http.post<Menu>(`${this.config.apiUrl}/menus`, menu);
  }

  actualizar(id: number, menu: Partial<Menu>): Observable<Menu> {
    return this.http.put<Menu>(`${this.config.apiUrl}/menus/${id}`, menu);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.config.apiUrl}/menus/${id}`);
  }
}
