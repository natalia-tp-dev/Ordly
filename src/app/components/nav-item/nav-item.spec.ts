import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NavItem } from './nav-item';

describe('NavItem', () => {
  let component: NavItem;
  let fixture: ComponentFixture<NavItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavItem],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Agenda');
    fixture.componentRef.setInput('icon', 'calendar');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
