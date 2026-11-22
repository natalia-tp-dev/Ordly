import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AgendaWeek } from './agenda-week';

describe('AgendaWeek', () => {
  let component: AgendaWeek;
  let fixture: ComponentFixture<AgendaWeek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaWeek],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaWeek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
