import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AgendaMonth } from './agenda-month';

describe('AgendaMonth', () => {
  let component: AgendaMonth;
  let fixture: ComponentFixture<AgendaMonth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaMonth],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaMonth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
