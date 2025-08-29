import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';
import { MesaService } from '../mesa.service';
import { Mesa } from '../mesa.model';

@Component({
  selector: 'app-mesa-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './mesa-table.html',
  styleUrls: ['../../tabla.css']
})
export class MesaTableComponent implements OnInit {
  private filtros$ = new BehaviorSubject<{
    idSucursal?: number;
    idEstado?: number;
    numeroMesa?: number;
  }>({});

  private reload$ = new Subject<void>();

  mesas$!: Observable<Mesa[]>;

  @Output() editarMesa = new EventEmitter<Mesa>();

  constructor(
    private mesaSvc: MesaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.mesas$ = combineLatest([
      this.filtros$,
      this.reload$.pipe(startWith(void 0))
    ]).pipe(
      switchMap(([filtros]) =>
        this.mesaSvc.listar({
          idSucursal: filtros.idSucursal,
          idEstado: filtros.idEstado,
          numeroMesa: filtros.numeroMesa
        })
      ),
      tap(() => this.cdr.markForCheck())
    );
  }

  @Input() set idSucursal(v: number | undefined) {
    this.updateFiltros({ idSucursal: v });
  }
  @Input() set idEstado(v: number | undefined) {
    this.updateFiltros({ idEstado: v });
  }
  @Input() set numeroMesa(v: number | undefined) {
    this.updateFiltros({ numeroMesa: v });
  }


  private updateFiltros(patch: Partial<{
    idSucursal?: number;
    idEstado?: number;
    numeroMesa?: number;
  }>) {
    const current = this.filtros$.value;
    this.filtros$.next({ ...current, ...patch });
  }

  reload() {
    this.reload$.next();
  }

  toggleEstado(mesa: Mesa): void {
    const nuevoEstado = mesa.estado.id === 1 ? 2 : 1;
    this.mesaSvc.cambiarEstado(mesa.id, nuevoEstado).subscribe({
      next: () => this.reload$.next(),
      error: (e) => console.error(e)
    });
  }

  trackById(_: number, mesa: Mesa) {
    return mesa.id;
  }
}
