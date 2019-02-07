import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedessocialesComponent } from './redessociales.component';

describe('RedessocialesComponent', () => {
  let component: RedessocialesComponent;
  let fixture: ComponentFixture<RedessocialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedessocialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedessocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
