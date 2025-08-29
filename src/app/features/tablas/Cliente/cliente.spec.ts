import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClienteService, Cliente } from './cliente.service';

describe('ClienteService', () => {
  let service: ClienteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService]
    });
    service = TestBed.inject(ClienteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener la lista de clientes', () => {
    const mockClientes: Cliente[] = [
      { id: 1, codigo: '000001', nombre: 'Juan', apellido: 'Pérez' }
    ];

    service.getClientes().subscribe(clientes => {
      expect(clientes.length).toBe(1);
      expect(clientes).toEqual(mockClientes);
    });

    const req = httpMock.expectOne('/api/clientes');
    expect(req.request.method).toBe('GET');
    req.flush(mockClientes);
  });
});