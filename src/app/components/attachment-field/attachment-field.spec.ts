import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentField } from './attachment-field';

describe('AttachmentField', () => {
  let component: AttachmentField;
  let fixture: ComponentFixture<AttachmentField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttachmentField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachmentField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
