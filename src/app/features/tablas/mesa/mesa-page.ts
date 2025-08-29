// features/tablas/mesa/mesa-page.ts
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectApiComponent } from '@shared/components/select-api/select-api';
import { MesaTableComponent } from './mesa-table/mesa-table';
import { MesaFormComponent } from './mesa-form/mesa-form';
import { MesaService } from './mesa.service';
import { Mesa } from './mesa.model';

interface Filtros {
  idSucursal?: number;
  idEstado?: number;
  numeroMesa?: number;
}

@Component({
  selector: 'app-mesa-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectApiComponent,
    MesaTableComponent,
    MesaFormComponent
  ],
  templateUrl: './mesa-page.html',
  styleUrls: ['../tabla.css']
})
export class MesaPageComponent {
  @ViewChild(MesaTableComponent) table!: MesaTableComponent;

  filtros: Filtros = {};
  showForm = false;
  selectedMesa?: Mesa;

  constructor(private mesaSvc: MesaService) {}

  onFiltroChange(campo: keyof Filtros, valor: number) {
    this.filtros = { ...this.filtros, [campo]: valor };
  }

  recargarTabla() {
    this.table.reload();
  }

  nuevaMesa() {
    this.selectedMesa = undefined;
    this.showForm = true;
  }

  editarMesa(mesa: Mesa) {
    this.selectedMesa = mesa;
    this.showForm = true;
  }

  onSave(mesa: Partial<Mesa>) {
    const obs = mesa.id
      ? this.mesaSvc.actualizar(mesa.id, mesa)
      : this.mesaSvc.crear(mesa);

    obs.subscribe(() => {
      this.showForm = false;
      this.recargarTabla();
    });
  }

  onCancel() {
    this.showForm = false;
  }
}
