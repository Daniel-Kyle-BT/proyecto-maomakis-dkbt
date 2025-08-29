// shared/components/select-api/select-api.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges,
  SimpleChanges, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-select-api',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-api.html',
  styleUrls: ['../../../features/tablas/empleado/empleado-page.css']
})
export class SelectApiComponent implements OnInit, OnChanges {
  @Input() label = 'Seleccione';  
  @Input() apiPath = '';           
  @Input() params: Record<string, string|number|undefined> = {};  
  @Input() selectedId?: number|undefined;    

  @Output() selectionChange = new EventEmitter<number>();

  data$!: Observable<Array<{ id: number; descripcion: string }>>;
  current?: number;

  private http = inject(HttpClient);
  constructor(@Inject('APP_CONFIG') private config: any) {}

  ngOnInit() {
    this.loadItems();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['apiPath']?.previousValue !== changes['apiPath']?.currentValue ||
      changes['params']
    ) {
      this.loadItems();
    }
    if (changes['selectedId']) {
      this.current = this.selectedId;
    }
  }

  private loadItems() {
    // Si falta apiPath, no devolvemos nada
    if (!this.apiPath) {
      this.data$ = of([]);
      return;
    }

    let httpParams = new HttpParams();
    Object.entries(this.params).forEach(([key, val]) => {
      if (val != null && val !== '') {
        httpParams = httpParams.set(key, val.toString());
      }
    });

    this.data$ = this.http.get<Array<{ id: number; descripcion: string }>>(
      `${this.config.apiUrl}${this.apiPath}`,
      { params: httpParams }
    );
     // 👇 Asegura que el valor seleccionado se aplique después de cargar
    if (this.selectedId != null) {
      this.current = this.selectedId;
    }
  }

  onChange(event: Event) {
    const val = +(event.target as HTMLSelectElement).value;
    this.current = isNaN(val) ? undefined : val;
    this.selectionChange.emit(this.current!);
  }
}


/*
import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-api',
  standalone: true,
  imports: [CommonModule],
  template: `
    <label class="select-label">{{ label }}</label>
    <select class="select-control" (change)="onChange($event)"><!-- ">-->
      <option value="" >Seleccione..</option>
       <option *ngFor="let item of (data$ | async)" [value]="item.id">
        {{ item.descripcion }}
      </option>
    </select>
  `,
  styles: [`

  `]
})
export class SelectApiComponent  implements OnInit {


  @Input() apiPath = '';
  @Input() label = 'Seleccionar';
  @Output() selectionChange = new EventEmitter<number>();
  data$!: Observable<any[]>; 
 
    // 👇 Traemos el apiUrl desde appConfig
  constructor(@Inject('APP_CONFIG') private config: any) {}
  //data: any[] = [];
  private http = inject(HttpClient);
  ngOnInit() {
    this.data$ = this.http.get<any[]>(`${this.config.apiUrl}${this.apiPath}`);
  }

  onChange(event: Event) {
    const id = +(event.target as HTMLSelectElement).value;
    this.selectionChange.emit(id);
  }
}*/