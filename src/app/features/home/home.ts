import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { RouterModule, Router } from '@angular/router'; // ✅ Import correcto

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  userMenuOpen = false;

  get usuario() {
    return this.authService.getUsuario();
  }

  get rol() {
    return this.authService.getRol();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // redirige al login
  }

}