import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Messages } from './messages/messages';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Messages],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = 'Timesheet manager';
  protected readonly showMessages = signal(false);

  protected toggleMessages(): void {
    this.showMessages.update((shown) => !shown);
  }
}
