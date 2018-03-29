import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickRoomComponent } from './pick-room.component';

describe('PickRoomComponent', () => {
  let component: PickRoomComponent;
  let fixture: ComponentFixture<PickRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
