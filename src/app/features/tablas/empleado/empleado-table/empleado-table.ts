// features/tablas/empleado/empleado-table/empleado-table.ts
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, EventEmitter, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { EmpleadoService } from '../empleado.service';
import { Empleado } from '../empleado.models';

@Component({
  selector: 'app-empleado-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './empleado-table.html',
  styleUrls: ['../empleado-page.css']
})

export class EmpleadoTableComponent implements OnInit {
  private filtros$ = new BehaviorSubject<{
    idCargo?: number;
    idDistrito?: number;
    idProvincia?: number;
    idDepartamento?: number;
    estado: boolean;
  }>({ estado: true });

  private reload$ = new Subject<void>();
  empleados$!: Observable<Empleado[]>;

  @Output() editarEmpleado = new EventEmitter<Empleado>();

  constructor(
    private empleadoSvc: EmpleadoService,
    private cdr: ChangeDetectorRef
  ) {}

  /** Cada vez que cambian filtros o se dispara reload$, llamamos al backend */
  ngOnInit() {
    this.empleados$ = combineLatest([
      this.filtros$,
      this.reload$.pipe(startWith(void 0))
    ]).pipe(
      switchMap(([filtros]) =>
        this.empleadoSvc.listar({
          idCargo: filtros.idCargo,
          idDistrito: filtros.idDistrito,
          idProvincia: filtros.idProvincia,
          idDepartamento: filtros.idDepartamento,
          estado: filtros.estado
        })
      ),
      tap(() => this.cdr.markForCheck())
    );
  }

  // Los inputs actualizan el BehaviorSubject
  @Input()
  set idCargo(v: number | undefined) {
    this.updateFiltros({ idCargo: v });
  }
  @Input()
  set idDistrito(v: number | undefined) {
    this.updateFiltros({ idDistrito: v });
  }
  @Input()
  set idProvincia(v: number | undefined) {
    this.updateFiltros({ idProvincia: v });
  }
  @Input()
  set idDepartamento(v: number | undefined) {
    this.updateFiltros({ idDepartamento: v });
  }
  @Input()
  set estado(v: boolean) {
    this.updateFiltros({ estado: v });
  }

  private updateFiltros(patch: Partial<{
    idCargo?: number;
    idDistrito?: number;
    idProvincia?: number;
    idDepartamento?: number;
    estado: boolean;
  }>) {
    const current = this.filtros$.value;
    this.filtros$.next({ ...current, ...patch });
  }

    // Expuesto públicamente para que el padre recargue
  reload() {
    this.reload$.next();
  }

  /** Llamado tras el patch individual de un empleado */
  toggleEstado(emp: Empleado): void {
    const nuevo = !emp.estado;
    this.empleadoSvc
      .cambiarEstado(emp.id, nuevo)
      .subscribe({
        next: () => {
          // señalamos recarga
          this.reload$.next();
        },
        error: (e) => console.error(e)
      });
  }

  trackById(_: number, emp: Empleado) {
    return emp.id;
  }
}



