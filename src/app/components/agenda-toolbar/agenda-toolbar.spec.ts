
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaToolbar } from './agenda-toolbar';

describe('AgendaToolbar', () => {
  let component: AgendaToolbar;
  let fixture: ComponentFixture<AgendaToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaToolbar]
    }).compileComponents();

    fixture = TestBed.createComponent(AgendaToolbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with week view selected', () => {
    expect(component.view()).toBe('week');
  });

  it('should change between month, week and day views', () => {
    component.setView('month');
    expect(component.view()).toBe('month');

    component.setView('day');
    expect(component.view()).toBe('day');

    component.setView('week');
    expect(component.view()).toBe('week');
  });

  it('should move to the previous week', () => {
    component.currentDate.set(new Date(2026, 10, 18));

    component.previous();

    expect(component.currentDate().getDate()).toBe(11);
  });

  it('should move to the next week', () => {
    component.currentDate.set(new Date(2026, 10, 18));

    component.next();

    expect(component.currentDate().getDate()).toBe(25);
  });

  it('should move to the previous month', () => {
    component.currentDate.set(new Date(2026, 10, 18));
    component.setView('month');

    component.previous();

    expect(component.currentDate().getMonth()).toBe(9);
  });

  it('should move to the next month', () => {
    component.currentDate.set(new Date(2026, 10, 18));
    component.setView('month');

    component.next();

    expect(component.currentDate().getMonth()).toBe(11);
  });

  it('should move to the previous day', () => {
    component.currentDate.set(new Date(2026, 10, 18));
    component.setView('day');

    component.previous();

    expect(component.currentDate().getDate()).toBe(17);
  });

  it('should move to the next day', () => {
    component.currentDate.set(new Date(2026, 10, 18));
    component.setView('day');

    component.next();

    expect(component.currentDate().getDate()).toBe(19);
  });

  it('should return to today', () => {
    component.currentDate.set(new Date(2020, 0, 1));

    const today = new Date();
    component.goToToday();

    expect(component.currentDate().getDate()).toBe(today.getDate());
    expect(component.currentDate().getMonth()).toBe(today.getMonth());
    expect(component.currentDate().getFullYear()).toBe(today.getFullYear());
  });

  it('should display a date range', () => {
    expect(component.dateRangeLabel()).toBeTruthy();
  });
});

