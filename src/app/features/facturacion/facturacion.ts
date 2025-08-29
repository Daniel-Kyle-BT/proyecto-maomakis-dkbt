import { Component, OnInit } from '@angular/core';
import { FacturacionService } from './facturacion.service';
import { Pedido } from '../pedidos/pedido.model';
import { Comprobante } from './comprobante/comprobante.model';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.html',
  styleUrls: ['./facturacion.css']
})
export class FacturacionComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidoSeleccionado: Pedido | null = null;
  mostrarFormulario = false;
  comprobante: Partial<Comprobante> = {};

  constructor(private facturacionService: FacturacionService) {}

  ngOnInit(): void {
    this.facturacionService.listarPedidosEmitidos().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }



  guardarComprobante(): void {
    if (this.comprobante) {
      this.facturacionService.crearComprobante(this.comprobante).subscribe(() => {
        this.mostrarFormulario = false;
        this.pedidoSeleccionado = null;
      });
    }
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.pedidoSeleccionado = null;
    this.comprobante = {};
  }
}