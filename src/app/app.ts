import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalBaseComponent } from './components/modal-base/modal-base';
import { AttachmentFieldComponent } from './components/attachment-field/attachment-field';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ModalBaseComponent, AttachmentFieldComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ordly');
}
