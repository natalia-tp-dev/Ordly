import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedControl } from './segmented-control';

describe('SegmentedControl', () => {
  let component: SegmentedControl;
  let fixture: ComponentFixture<SegmentedControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentedControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentedControl);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', [{ label: 'Mes', value: 'month' }]);
    fixture.componentRef.setInput('value', 'month');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
