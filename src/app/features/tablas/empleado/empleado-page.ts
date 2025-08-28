// features/tablas/empleado/empleado-page.ts
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectApiComponent } from '@shared/components/select-api/select-api';
import { EmpleadoTableComponent } from "./empleado-table/empleado-table";
import { EmpleadoFormComponent } from './empleado-form/empleado-form';
import { EmpleadoService } from './empleado.service';
import { Empleado, CargoEmpleado, Distrito } from './empleado.models';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Filtros {
  idCargo?: number;
  idDistrito?: number;
  idProvincia?: number;
  idDepartamento?: number;
  estado: boolean;
}

@Component({
  selector: 'app-empleado-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectApiComponent,
    EmpleadoTableComponent,
    EmpleadoFormComponent
  ],
  templateUrl: './empleado-page.html',
  styleUrls: ['./empleado-page.css']
})

export class EmpleadoPageComponent {
  @ViewChild(EmpleadoTableComponent) table!: EmpleadoTableComponent;

  filtros: Filtros = { estado: true };
  showForm = false;
  selectedEmpleado?: Empleado;

  constructor(private empleadoSvc: EmpleadoService) { }

  onFiltroChange(campo: keyof Filtros, valor: number) {
    this.filtros = { ...this.filtros, [campo]: valor };
    if (campo === 'idDepartamento') {
      this.filtros.idProvincia = undefined;
      this.filtros.idDistrito = undefined;
    }
    if (campo === 'idProvincia') {
      this.filtros.idDistrito = undefined;
    }
  }

  toggleEstado() {
    this.filtros = { ...this.filtros, estado: !this.filtros.estado };
  }

  recargarTabla() {
    this.table.reload();
  }



  nuevoEmpleado() {
    this.selectedEmpleado = undefined;  // en lugar de null
    this.showForm = true;
  }

  editarEmpleado(emp: Empleado) {
    this.selectedEmpleado = emp;       // tipo Empleado
    this.showForm = true;
  }

  // Guardar desde el form
  onSave(empleado: Partial<Empleado>) {
    const obs = empleado.id
      ? this.empleadoSvc.actualizar(empleado.id, empleado)
      : this.empleadoSvc.crear(empleado);

    obs.subscribe(() => {
      this.showForm = false;
      this.recargarTabla();
    });
  }

  onCancel() {
    this.showForm = false;
  }
  
}

