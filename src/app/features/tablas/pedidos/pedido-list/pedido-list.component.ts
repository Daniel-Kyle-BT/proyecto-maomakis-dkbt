// pedido-list.component.ts
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../pedido.service';
import { Pedido } from '../pedido.model';
import { PedidoCreateComponent } from '../pedido-create/pedido-create.component';

@Component({
  selector: 'app-pedido-list',
  standalone: true,
  imports: [CommonModule, PedidoCreateComponent],
  templateUrl: './pedido-list.component.html',
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];
  cargando = false;

  mostrarFormulario = false;         // controlar modal
  pedidoSeleccionado: Pedido | null = null; // pedido actual a editar

  constructor(private pedidoService: PedidoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos() {
    this.cargando = true;
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => { console.error(err); this.cargando = false; }
    });
  }

  eliminarPedido(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este pedido?')) return;
    this.pedidoService.eliminar(id).subscribe({
      next: () => { alert('Pedido eliminado'); this.listarPedidos(); },
      error: (err) => { console.error(err); alert('Error al eliminar pedido'); }
    });
  }

  // 🔹 Abrir modal para nuevo pedido
  nuevoPedido() {
    this.pedidoSeleccionado = null; // no hay pedido a editar
    this.mostrarFormulario = true;
  }

  // 🔹 Abrir modal para editar pedido
  editarPedido(pedido: Pedido) {
    this.pedidoSeleccionado = { ...pedido }; // copia para no mutar
    this.mostrarFormulario = true;
  }

  // 🔹 Cierra el modal
  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  // 🔹 Se ejecuta cuando se crea o edita un pedido
  onPedidoCreado(pedido: Pedido) {
    if (this.pedidoSeleccionado) {
      // edición
      const index = this.pedidos.findIndex(p => p.idPedido === pedido.idPedido);
      if (index > -1) this.pedidos[index] = pedido;
    } else {
      // nuevo pedido
      this.pedidos.push(pedido);
    }
    this.mostrarFormulario = false;
  }
}
