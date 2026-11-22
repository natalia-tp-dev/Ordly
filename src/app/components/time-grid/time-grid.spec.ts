import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGrid } from './time-grid';

describe('TimeGrid', () => {
  let component: TimeGrid;
  let fixture: ComponentFixture<TimeGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeGrid);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('days', [new Date()]);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
