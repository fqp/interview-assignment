import { Component, inject } from '@angular/core';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages {
  protected readonly messageService = inject(MessageService);
}
