import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosbusquedaComponent } from './articulosbusqueda.component';

describe('ArticulosbusquedaComponent', () => {
  let component: ArticulosbusquedaComponent;
  let fixture: ComponentFixture<ArticulosbusquedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosbusquedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosbusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
