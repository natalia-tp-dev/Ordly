import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachmentFieldComponent } from './attachment-field';

describe('AttachmentField', () => {
  let component: AttachmentFieldComponent;
  let fixture: ComponentFixture<AttachmentFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentFieldComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
