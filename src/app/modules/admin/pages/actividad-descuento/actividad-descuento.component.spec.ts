import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadDescuentoComponent } from './actividad-descuento.component';

describe('ActividadDescuentoComponent', () => {
  let component: ActividadDescuentoComponent;
  let fixture: ComponentFixture<ActividadDescuentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadDescuentoComponent]
    });
    fixture = TestBed.createComponent(ActividadDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
