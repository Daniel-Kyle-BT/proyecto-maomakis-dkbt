import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { HomeComponent } from '@features/home/home';
import { ReportesComponent } from '@features/reportes/reportes';
import { PedidosComponent } from '@features/pedidos/pedidos';
import { FacturacionComponent } from '@features/facturacion/facturacion';
import { AuthGuard } from '@core/auth/auth.guard';
import { RoleGuard } from '@core/auth/role-guard';
import { InicioComponent } from '@features/inicio/inicio';
import { LoginGuard } from '@core/auth/login.guard';
import { EmpleadoPageComponent } from '@features/tablas/empleado/empleado-page';
import { MenuComponent } from '@features/tablas/menu/menu';

export const routes: Routes = [
  // Ruta inicial → Login
  { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [LoginGuard] },
  // Home como contenedor con rutas hijas
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      // Página de inicio dentro de Home
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent }, // o un componente de bienvenida
      // Rutas protegidas por rol
      { path: 'reportes', component: ReportesComponent, canActivate: [RoleGuard(['Supervisor'])] },
      { path: 'pedidos', component: PedidosComponent, canActivate: [RoleGuard(['Mesero', 'Cajero'])] },
      { path: 'facturacion', component: FacturacionComponent, canActivate: [RoleGuard(['Cajero'])] },
      { path: 'empleado', component: EmpleadoPageComponent, canActivate: [RoleGuard(['Administrador','Supervisor'])] },
      { path: 'menu', component: MenuComponent, canActivate: [RoleGuard(['Administrador','Supervisor'])] }
    ]
  },

  // Cualquier ruta desconocida → Login
  { path: '**', redirectTo: '', pathMatch: 'full'  }
];
