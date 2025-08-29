import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  @ViewChild('wrapper', { static: false }) wrapperRef!: ElementRef<HTMLElement>;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      codigoEmpleado: ['', Validators.required]
    });
  }

  /*toggleForms(active: boolean) {
    this.wrapperActive = active;
  }*/
  toggleForms(active: boolean): void {
    const wrapperEl = this.wrapperRef.nativeElement;
    const bgEl = wrapperEl.querySelector('.bg-animate') as HTMLElement;
    // 1. Quito ambas clases
    wrapperEl.classList.remove('active', 'deactive');
    // 2. Forzar reflow para que la animación pueda reiniciarse
    void wrapperEl.offsetWidth;
    // 3. Agregar la clase correspondiente
    wrapperEl.classList.add(active ? 'active' : 'deactive');

    // Limpia clases previas
    bgEl.classList.remove('forma2', 'forma3');

    if (active) {
      // Activar: forma1 → forma2 → forma3
      setTimeout(() => {
        bgEl.classList.add('forma2');
        setTimeout(() => {
          bgEl.classList.add('forma3');
        }, 1000); // ← espera 1.2s para aplicar forma3
      }, 600); // delay inicial
    } else {
      // Desactivar: forma3 → forma2 → forma1
      bgEl.classList.add('forma3');
      setTimeout(() => {
        bgEl.classList.remove('forma3');
        bgEl.classList.add('forma2');
        setTimeout(() => {
          bgEl.classList.remove('forma2');
        }, 1000); // ← espera 1.2s para aplicar forma2
      }, 600); // delay inicial
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (res) => {
          this.authService.me().subscribe({
            next: (usuario) => {
              alert(`Bienvenido ${usuario.nombreEmpleado} ${usuario.apellidoEmpleado} (Rol: ${usuario.rol.nombre})`);
              this.router.navigateByUrl('/home');
            },
            error: () => alert('Error obteniendo información del usuario')
          });
        },
        error: () => alert('Credenciales incorrectas')
      });
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { username, password, codigoEmpleado } = this.registerForm.value;
      this.authService.register({ username, password }, codigoEmpleado).subscribe({
        next: (res) => {
          alert(`Registro exitoso ${res.nombreEmpleado} ${res.apellidoEmpleado}`);
          this.toggleForms(false);
        },
        error: (err) => {
          // Spring devuelve el mensaje exacto en el body
          alert(err.error);
        }
      });
    }
  }
}