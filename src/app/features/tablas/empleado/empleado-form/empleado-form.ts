// features/tablas/empleado/empleado-form/empleado-form.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleado } from '../empleado.models';
import { SelectApiComponent } from '@shared/components/select-api/select-api';

@Component({
  selector: 'app-empleado-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectApiComponent],
  templateUrl: './empleado-form.html',
  styleUrls: ['../../form.css']
})
export class EmpleadoFormComponent implements OnInit {
  @Input() empleado?: Empleado;
  @Output() save = new EventEmitter<Partial<Empleado>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.minLength(8)]],
      telefono: ['', [Validators.minLength(6)]],
      estado: [true],
      idCargo: [undefined as number | undefined, Validators.required],
      idDepartamento: [undefined as number | undefined, Validators.required],
      idProvincia: [undefined as number | undefined, Validators.required],
      idDistrito: [undefined as number | undefined, Validators.required]
    });

    if (this.empleado) {
      this.form.patchValue({
        codigo: this.empleado.codigo,
        nombre: this.empleado.nombre,
        apellido: this.empleado.apellido,
        dni: this.empleado.dni ?? '',
        telefono: this.empleado.telefono ?? '',
        estado: this.empleado.estado,
        idCargo: this.empleado.cargo.id,
        idDepartamento: this.empleado.distrito.provincia.departamento,
        idProvincia: this.empleado.distrito.provincia.id,
        idDistrito: this.empleado.distrito.id
      });
    }
    this.form.get('idDepartamento')?.valueChanges.subscribe(() => {
      this.form.patchValue({ idProvincia: undefined, idDistrito: undefined });
    });
    this.form.get('idProvincia')?.valueChanges.subscribe(() => {
      this.form.patchValue({ idDistrito: undefined });
    });

  }

  get idDepartamento(): number | undefined {
    return this.form.get('idDepartamento')?.value;
  }
  get idProvincia(): number | undefined {
    return this.form.get('idProvincia')?.value;
  }

  guardar() {
    if (this.form.invalid) return;

    const raw = this.form.value as {
      codigo: string;
      nombre: string;
      apellido: string;
      dni: string;
      telefono: string;
      estado: boolean;
      idCargo: number;
      idDistrito: number;
    };

    const resultado: Partial<Empleado> = {
      id: this.empleado?.id,
      codigo: raw.codigo,
      nombre: raw.nombre,
      apellido: raw.apellido,
      dni: raw.dni,
      telefono: raw.telefono,
      estado: raw.estado,
      cargo: { id: raw.idCargo } as any,
      distrito: { id: raw.idDistrito } as any
    };

    this.save.emit(resultado);
  }

  cancelar() {
    this.cancel.emit();
  }
}
