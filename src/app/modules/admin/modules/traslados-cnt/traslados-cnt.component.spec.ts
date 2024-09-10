import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladosCntComponent } from './traslados-cnt.component';

describe('TrasladosCntComponent', () => {
  let component: TrasladosCntComponent;
  let fixture: ComponentFixture<TrasladosCntComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrasladosCntComponent]
    });
    fixture = TestBed.createComponent(TrasladosCntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
