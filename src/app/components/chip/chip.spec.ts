import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chip } from './chip';

describe('Chip', () => {
  let component: Chip;
  let fixture: ComponentFixture<Chip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chip);
    fixture.componentRef.setInput('label', 'Urgente');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
