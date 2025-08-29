import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subject, startWith, switchMap, tap } from 'rxjs';
import { ClienteService, Cliente } from '../cliente.service';

@Component({
  selector: 'app-cliente-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './cliente-table.html',
  styleUrls: ['../cliente-page.css']
})
export class ClienteTableComponent implements OnInit {
  private reload$ = new Subject<void>();
  clientes$!: Observable<Cliente[]>;

  @Output() editarCliente = new EventEmitter<Cliente>();
  @Output() eliminarCliente = new EventEmitter<Cliente>();

  constructor(private clienteSvc: ClienteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.clientes$ = this.reload$.pipe(
      startWith(void 0),
      switchMap(() => this.clienteSvc.getClientes()),
      tap(() => this.cdr.markForCheck())
    );
  }

  reload() {
    this.reload$.next();
  }

  trackById(_: number, c: Cliente) {
    return c.id;
  }
}
