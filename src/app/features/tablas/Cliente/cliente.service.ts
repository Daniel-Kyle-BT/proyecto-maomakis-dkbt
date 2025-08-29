

import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Modelo Cliente embebido
export interface Cliente {
	id?: number;
	codigo: string;
	nombre: string;
	apellido: string;
	telefono?: string;
	fechaRegistro?: string;
	estado?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
	private http = inject(HttpClient);

	constructor(@Inject('APP_CONFIG') private config: any) {}

	getClientes(): Observable<Cliente[]> {
		return this.http.get<Cliente[]>(`${this.config.apiUrl}/clientes`);
	}

	getCliente(id: number): Observable<Cliente> {
		return this.http.get<Cliente>(`${this.config.apiUrl}/clientes/${id}`);
	}

	crearCliente(cliente: Cliente): Observable<Cliente> {
		return this.http.post<Cliente>(`${this.config.apiUrl}/clientes`, cliente);
	}

	actualizarCliente(id: number, cliente: Cliente): Observable<Cliente> {
		return this.http.put<Cliente>(`${this.config.apiUrl}/clientes/${id}`, cliente);
	}

	eliminarCliente(id: number): Observable<void> {
		return this.http.delete<void>(`${this.config.apiUrl}/clientes/${id}`);
	}
}