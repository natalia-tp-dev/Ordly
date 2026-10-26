import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalBaseComponent } from './components/modal-base/modal-base';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ordly');
  isModalOpen = false;
}
