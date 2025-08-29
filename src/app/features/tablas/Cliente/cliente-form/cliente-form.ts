import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.css']
})
export class ClienteFormComponent implements OnInit {
  @Input() cliente?: Cliente;
  @Output() save = new EventEmitter<Partial<Cliente>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codigo: ['', [Validators.required, Validators.maxLength(6)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: [''],
      estado: [true]
    });

    if (this.cliente) {
      this.form.patchValue({
        codigo: this.cliente.codigo,
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido,
        telefono: this.cliente.telefono ?? '',
        estado: this.cliente.estado ?? true
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;
    const raw = this.form.value as {
      codigo: string;
      nombre: string;
      apellido: string;
      telefono: string;
      estado: boolean;
    };

    const resultado: Partial<Cliente> = {
      id: this.cliente?.id,
      codigo: raw.codigo,
      nombre: raw.nombre,
      apellido: raw.apellido,
      telefono: raw.telefono,
      estado: raw.estado
    };
    this.save.emit(resultado);
  }

  cancelar() {
    this.cancel.emit();
  }
}
