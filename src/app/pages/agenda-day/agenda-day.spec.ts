import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AgendaDay } from './agenda-day';

describe('AgendaDay', () => {
  let component: AgendaDay;
  let fixture: ComponentFixture<AgendaDay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaDay],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaDay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
