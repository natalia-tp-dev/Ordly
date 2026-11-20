
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskForm } from './task-form';

describe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select a priority', () => {
    component.selectPriority('urgent');

    expect(component.priority()).toBe('urgent');
  });

  it('should close the form when cancel is called', () => {
    component.cancel();

    expect(component.isOpen()).toBe(false);
  });

  it('should close the form when a task is saved', () => {
    component.title.set('Entregar proyecto');
    component.saveTask();

    expect(component.isOpen()).toBe(false);
  });
});
