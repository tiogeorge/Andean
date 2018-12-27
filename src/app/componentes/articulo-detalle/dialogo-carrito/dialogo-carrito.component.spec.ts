import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCarritoComponent } from './dialogo-carrito.component';

describe('DialogoCarritoComponent', () => {
  let component: DialogoCarritoComponent;
  let fixture: ComponentFixture<DialogoCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
