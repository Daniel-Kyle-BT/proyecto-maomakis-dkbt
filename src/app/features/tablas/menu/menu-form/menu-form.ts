import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../menu.service';
import { Menu, Categoria } from '../menu.model';

@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-form.html',
  styleUrls: ['./menu-form.css']
})
export class MenuFormComponent implements OnInit, OnChanges {
  @Input() menuEditar: Menu | null = null;
  @Output() menuGuardado = new EventEmitter<Menu>();

  nuevoMenu: Partial<Menu> = {};
  categorias: Categoria[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: () => alert('Error al cargar categorías')
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['menuEditar'] && this.menuEditar) {
      // Copiamos el menú recibido para no mutar directamente
      this.nuevoMenu = { ...this.menuEditar };
    } else if (changes['menuEditar'] && this.menuEditar === null) {
      // Si no hay menú seleccionado, limpiar formulario
      this.nuevoMenu = {};
    }
  }

  guardarMenu() {
    if (this.nuevoMenu.id) {
      // 🔹 EDITAR
      this.menuService.actualizar(this.nuevoMenu.id, this.nuevoMenu).subscribe({
        next: (menu) => {
          this.menuGuardado.emit(menu);
          alert('Menú actualizado correctamente');
        },
        error: () => alert('Error al actualizar menú')
      });
    } else {
      // 🔹 CREAR
      this.menuService.crear(this.nuevoMenu).subscribe({
        next: (menu) => {
          this.menuGuardado.emit(menu);
          this.nuevoMenu = {};
          alert('Menú creado correctamente');
        },
        error: () => alert('Error al crear menú')
      });
    }
  }

onFileChange(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  // Guardamos solo el nombre en el objeto
  this.nuevoMenu.nombreImagen = file.name;
  this.nuevoMenu.rutaImagen = '/img/menu'; // ruta fija

  // Subimos la imagen al backend
  this.menuService.subirImagenMenu(file).subscribe({
    next: () => console.log('Imagen subida correctamente'),
    error: () => alert('Error al subir la imagen')
  });
}

}
