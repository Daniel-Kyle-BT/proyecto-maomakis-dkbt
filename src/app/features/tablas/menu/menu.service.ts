// features/tablas/menu/menu.service.ts
import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu, Categoria } from './menu.model';

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

  //Obtener categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.config.apiUrl}/categorias`);
  }

subirImagenMenu(file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.config.apiUrl}/upload/menu`, formData, { responseType: 'text' });
}


}
