import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompararEquiposComponent } from './comparar-equipos.component';

describe('CompararEquiposComponent', () => {
  let component: CompararEquiposComponent;
  let fixture: ComponentFixture<CompararEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompararEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompararEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
