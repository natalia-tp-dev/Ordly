import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBlock } from './event-block';

describe('EventBlock', () => {
  let component: EventBlock;
  let fixture: ComponentFixture<EventBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventBlock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventBlock);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Estadística');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
