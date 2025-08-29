import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteService, Cliente } from './cliente.service';
import { ClienteTableComponent } from './cliente-table/cliente-table';
import { ClienteFormComponent } from './cliente-form/cliente-form';

@Component({
		selector: 'app-cliente',
		standalone: true,
		imports: [CommonModule, ReactiveFormsModule, ClienteTableComponent, ClienteFormComponent],
		templateUrl: './cliente.html',
		styleUrls: ['./cliente-page.css']
})
	export class ClienteComponent {
		@ViewChild(ClienteTableComponent) table!: ClienteTableComponent;

		showForm = false;
		selectedCliente?: Cliente;

		constructor(private clienteSvc: ClienteService) {}

		// Page API mirroring EmpleadoPageComponent (minus filters)
		recargarTabla() {
			this.table.reload();
		}

		nuevoCliente() {
			this.selectedCliente = undefined;
			this.showForm = true;
		}

		editarCliente(c: Cliente) {
			this.selectedCliente = c;
			this.showForm = true;
		}

		onSave(cliente: Partial<Cliente>) {
			const obs = cliente.id
				? this.clienteSvc.actualizarCliente(cliente.id, cliente as Cliente)
				: this.clienteSvc.crearCliente(cliente as Cliente);

			obs.subscribe({
				next: () => {
					this.showForm = false;
					this.recargarTabla();
				},
				error: (err) => alert('Error al guardar cliente')
			});
		}

		onCancel() {
			this.showForm = false;
		}

			onEliminar(c: Cliente) {
				if (!confirm('¿Seguro que deseas eliminar este cliente?')) return;
				this.clienteSvc.eliminarCliente(c.id!).subscribe({
					next: () => this.recargarTabla(),
					error: () => alert('Error al eliminar cliente')
				});
			}
	}
