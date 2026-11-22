import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaToolbar } from './agenda-toolbar';

describe('AgendaToolbar', () => {
  let component: AgendaToolbar;
  let fixture: ComponentFixture<AgendaToolbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaToolbar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaToolbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
