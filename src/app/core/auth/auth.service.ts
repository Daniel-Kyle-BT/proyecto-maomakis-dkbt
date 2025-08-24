import { Inject, Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // 👇 Traemos el apiUrl desde appConfig
  constructor(@Inject('APP_CONFIG') private config: any) {}

  private currentUser: Usuario | null = null;

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  login(username: string, password: string): Observable<{token: string;}> {
    return this.http
      .post<{ token: string }>(`${this.config.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap((res) => {
          if (this.isBrowser()) {
            localStorage.setItem('token', res.token);
          }
        })
      );
  }

  register(usuario: { username: string; password: string }, codigoEmpleado: string): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${this.config.apiUrl}/auth/register/${codigoEmpleado}`,
      usuario
    );
  }

  me(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.config.apiUrl}/auth/me`).pipe(
      tap(user => {
        if (this.isBrowser()) {
          localStorage.setItem('usuario', JSON.stringify(user));
        }
        this.currentUser = user;
      })
    );
  }

  getUsuario(): Usuario | null {
    if (!this.currentUser && this.isBrowser()) {
      const stored = localStorage.getItem('usuario');
      this.currentUser = stored ? JSON.parse(stored) : null;
    }
    return this.currentUser;
  }

  getRol(): string | null {
    return this.getUsuario()?.rol?.nombre ?? null;
  }

  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('token') : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
    this.currentUser = null;
  }

}

