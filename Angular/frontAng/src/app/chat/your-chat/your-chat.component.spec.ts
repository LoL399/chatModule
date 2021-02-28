import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourChatComponent } from './your-chat.component';

describe('YourChatComponent', () => {
  let component: YourChatComponent;
  let fixture: ComponentFixture<YourChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
