import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatmovilComponent } from './chatmovil.component';

describe('ChatmovilComponent', () => {
  let component: ChatmovilComponent;
  let fixture: ComponentFixture<ChatmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
