import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriahomeComponent } from './categoriahome.component';

describe('CategoriahomeComponent', () => {
  let component: CategoriahomeComponent;
  let fixture: ComponentFixture<CategoriahomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriahomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriahomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
