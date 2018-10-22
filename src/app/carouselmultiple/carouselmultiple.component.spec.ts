import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselmultipleComponent } from './carouselmultiple.component';

describe('CarouselmultipleComponent', () => {
  let component: CarouselmultipleComponent;
  let fixture: ComponentFixture<CarouselmultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselmultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselmultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
