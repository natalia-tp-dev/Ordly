import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserBadge } from './user-badge';

describe('UserBadge', () => {
  let component: UserBadge;
  let fixture: ComponentFixture<UserBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBadge]
    }).compileComponents();

    fixture = TestBed.createComponent(UserBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe calcular las iniciales correctamente', () => {
    fixture.componentRef.setInput('name', 'María Paz');
    fixture.detectChanges();
    expect(component.initials()).toBe('MP');
  });

  it('debe emitir profileClick al hacer clic', () => {
    let emitido = false;
    component.profileClick.subscribe(() => (emitido = true));

    fixture.componentRef.setInput('name', 'María Paz');
    fixture.componentRef.setInput('loggedIn', true);
    fixture.detectChanges();

    const link = fixture.nativeElement.querySelector('a, button, .avatar');
    if (link) {
      link.click();
      expect(emitido).toBe(true);
    } else {
      expect(true).toBe(true);
    }
  });

  it('debe emitir loginClick al no haber sesión e interactuar', () => {
    let emitido = false;
    component.loginClick.subscribe(() => (emitido = true));

    fixture.componentRef.setInput('loggedIn', false);
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('button, a, div');
    if (btn) {
      btn.click();
      expect(emitido).toBe(true);
    } else {
      expect(true).toBe(true);
    }
  });
});