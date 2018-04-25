import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomStoriesComponent } from './room-stories.component';

describe('RoomStoriesComponent', () => {
  let component: RoomStoriesComponent;
  let fixture: ComponentFixture<RoomStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomStoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
