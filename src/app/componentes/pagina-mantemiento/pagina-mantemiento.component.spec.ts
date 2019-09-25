import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMantemientoComponent } from './pagina-mantemiento.component';

describe('PaginaMantemientoComponent', () => {
  let component: PaginaMantemientoComponent;
  let fixture: ComponentFixture<PaginaMantemientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaMantemientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMantemientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
