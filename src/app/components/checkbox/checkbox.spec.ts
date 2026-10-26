import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  let component: Checkbox;
  let fixture: ComponentFixture<Checkbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Checkbox]
    }).compileComponents();

    fixture = TestBed.createComponent(Checkbox);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Casilla de prueba');
    fixture.detectChanges();
  });

  const getInput = (): HTMLInputElement =>
    fixture.nativeElement.querySelector('input[type="checkbox"]');

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debe iniciar desmarcado por defecto', () => {
    expect(component.checked()).toBe(false);
    expect(getInput().checked).toBe(false);
  });

  it('debe cambiar de estado al hacer clic', () => {
    const input = getInput();
    input.click();
    fixture.detectChanges();
    expect(component.checked()).toBe(true);
    expect(getInput().checked).toBe(true);
  });

  it('debe aceptar estado inicial marcado', () => {
    fixture.componentRef.setInput('checked', true);
    fixture.detectChanges();
    expect(getInput().checked).toBe(true);
  });

  it('debe mostrar la etiqueta', () => {
      fixture.componentRef.setInput('label', 'Acepto términos');
      fixture.componentRef.setInput('showLabel', true);
      fixture.detectChanges();
      const labelText = fixture.nativeElement.textContent;
      expect(labelText).toContain('Acepto términos');
    });

  it('debe respetar el estado deshabilitado', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(getInput().disabled).toBe(true);
    expect(component.checked()).toBe(false);
  });
});