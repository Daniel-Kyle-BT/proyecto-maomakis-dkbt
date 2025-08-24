import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePedido } from './create-pedido';

describe('CreatePedido', () => {
  let component: CreatePedido;
  let fixture: ComponentFixture<CreatePedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
