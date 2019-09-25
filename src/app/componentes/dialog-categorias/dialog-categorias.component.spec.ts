import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCategoriasComponent } from './dialog-categorias.component';

describe('DialogCategoriasComponent', () => {
  let component: DialogCategoriasComponent;
  let fixture: ComponentFixture<DialogCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
