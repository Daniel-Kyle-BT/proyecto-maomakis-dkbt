import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Menu } from './menu.model';
import { CommonModule } from '@angular/common';
import { MenuService } from './menu.service'; 
import { MenuFormComponent } from './menu-form/menu-form';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuFormComponent], 
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})

export class MenuComponent implements OnInit {
  
  menus: Menu[] = [];
  menuSeleccionado: Menu | null = null;
  
  constructor(private menuService: MenuService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarMenus();
  }

  cargarMenus() {
    this.menuService.getMenus().subscribe({
      next: (data) => {
        console.log('Datos recibidos de la API:', data);
        this.menus = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al traer menús', err)
    });
  }

  trackById(index: number, item: Menu): number {
    return item.id;
  }

  // Se ejecuta al guardar (crear o actualizar)
  onMenuGuardado(menu: Menu) {
    if (this.menuSeleccionado) {
      // 🔹 Actualizar en la lista
      const index = this.menus.findIndex(m => m.id === menu.id);
      if (index > -1) this.menus[index] = menu;
    } else {
      // 🔹 Agregar nuevo
      this.menus.push(menu);
    }

    // Cerrar modal
    const modal = document.getElementById('menuModal');
    if (modal) {
      // @ts-ignore
      const bsModal = bootstrap.Modal.getInstance(modal);
      if (bsModal) {
        bsModal.hide();
      }
    }

    // Reset selección
    this.menuSeleccionado = null;
  }

  // Abrir modal en modo edición
  editar(menu: Menu) {
    this.menuSeleccionado = { ...menu };
    const modal = document.getElementById('menuModal');
    if (modal) {
      // @ts-ignore
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  // Abrir modal en modo creación
  nuevo() {
    this.menuSeleccionado = null;
    const modal = document.getElementById('menuModal');
    if (modal) {
      // @ts-ignore
      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();
    }
  }

  eliminar(menu: Menu) {
  if (confirm(`¿Seguro que deseas eliminar el menú "${menu.nombre}"?`)) {
    this.menuService.eliminar(menu.id).subscribe({
      next: () => {
        // Filtramos la lista en memoria
        this.menus = this.menus.filter(m => m.id !== menu.id);
        alert('Menú eliminado correctamente');
      },
      error: () => alert('Error al eliminar menú')
    });
  }
}

}
