import { Component, inject } from '@angular/core';
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
  wrapperActive = false;
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

  toggleForms(active: boolean) {
    this.wrapperActive = active;
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