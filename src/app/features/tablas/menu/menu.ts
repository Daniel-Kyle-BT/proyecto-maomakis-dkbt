import { Component, OnInit } from '@angular/core';
import { MenuService, Menu } from './menu.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenus().subscribe({
      next: (data) => this.menus = data,
      error: (err) => console.error('Error al traer menús', err)
    });
  }
}