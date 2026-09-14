import { Injectable, signal } from '@angular/core';

/** Collects human-readable messages about what the app is doing. */
@Injectable({ providedIn: 'root' })
export class MessageService {
  private readonly log = signal<readonly string[]>([]);

  readonly messages = this.log.asReadonly();

  add(message: string): void {
    this.log.update((messages) => [...messages, message]);
  }

  clear(): void {
    this.log.set([]);
  }
}
