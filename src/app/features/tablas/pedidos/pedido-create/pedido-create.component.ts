import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoService } from '../pedido.service';
import { Pedido, Empleado, Mesa, Direccion, TipoPedido, Estado } from '../pedido.model';

@Component({
  selector: 'app-pedido-form', // o 'app-pedido-create'
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido-create.component.html', // tu HTML
  styleUrls: ['./pedido-create.component.css']
})
export class PedidoCreateComponent implements OnInit {
  @Input() pedidoEditar: Pedido | null = null; // <-- esto permite editar
  @Output() pedidoCreado = new EventEmitter<Pedido>();

  nuevoPedido: Partial<Pedido> = {
    total: 0,
    fechaInicio: new Date().toISOString(),
  };

  tiposPedido: TipoPedido[] = [];
  empleados: Empleado[] = [];
  mesas: Mesa[] = [];
  direcciones: Direccion[] = [];
  estados: Estado[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    if (this.pedidoEditar) {
      this.nuevoPedido = { ...this.pedidoEditar }; // cargar datos para editar
    }
    this.cargarDatos();
  }

  cargarDatos() {
    // aquí cargas tus combos
  }

  guardarPedido() {
    if (!this.nuevoPedido.tipoPedido || !this.nuevoPedido.empleado || !this.nuevoPedido.estado) {
      alert('Selecciona Tipo de Pedido, Empleado y Estado');
      return;
    }

    // decidir si es crear o actualizar
    if (this.pedidoEditar) {
      this.pedidoService.actualizar(this.nuevoPedido.idPedido!, this.nuevoPedido).subscribe({
        next: (pedido) => {
          alert('Pedido actualizado correctamente');
          this.pedidoCreado.emit(pedido);
        },
        error: () => alert('Error al actualizar pedido')
      });
    } else {
      this.pedidoService.crear(this.nuevoPedido).subscribe({
        next: (pedido) => {
          alert('Pedido creado correctamente');
          this.pedidoCreado.emit(pedido);
          this.nuevoPedido = { total: 0, fechaInicio: new Date().toISOString() };
        },
        error: () => alert('Error al crear pedido')
      });
    }
  }
}
