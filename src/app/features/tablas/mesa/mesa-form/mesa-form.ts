import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mesa } from '../mesa.model';
import { SelectApiComponent } from '@shared/components/select-api/select-api';

@Component({
  selector: 'app-mesa-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SelectApiComponent],
  templateUrl: './mesa-form.html',
  styleUrls: ['../../form.css']
})
export class MesaFormComponent implements OnInit {
  @Input() mesa?: Mesa;
  @Output() save = new EventEmitter<Partial<Mesa>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

    ngOnInit() {
    this.form = this.fb.group({
      numeroMesa: ['', [Validators.required]],
      capacidad: ['', [Validators.required]],
      idSucursal: [undefined as number | undefined, Validators.required],
      idEstado: [undefined as number | undefined, Validators.required],
    });
    if (this.mesa) {
      this.form.patchValue({
        numeroMesa: this.mesa.numeroMesa,
        capacidad: this.mesa.capacidad,
        idSucursal: this.mesa.sucursal.id,
        idEstado: this.mesa.estado.id
      });
    }
  }


  guardar() {
    if (this.form.invalid) return;

    const raw = this.form.value as {
      numeroMesa: number;
      capacidad: number;
      idSucursal: number;
      idEstado: number;
    };
 
    const resultado: Partial<Mesa> = {
      id: this.mesa?.id,
      numeroMesa: raw.numeroMesa,
      capacidad: raw.capacidad,
      sucursal: { id: raw.idSucursal } as any,
      estado: { id: raw.idEstado } as any
    };

    this.save.emit(resultado);
  }

  cancelar() {
    this.cancel.emit();
  }

}