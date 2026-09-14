import { Component, inject, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-search',
  imports: [RouterLink],
  templateUrl: './timesheet-search.html',
  styleUrl: './timesheet-search.css',
})
export class TimesheetSearch {
  private readonly timesheetService = inject(TimesheetService);

  protected readonly term = signal('');

  /** Waits 300ms after the last keystroke and ignores repeats of the same term. */
  private readonly debouncedTerm = toSignal(
    toObservable(this.term).pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' },
  );

  protected readonly results = rxResource({
    params: () => this.debouncedTerm(),
    stream: ({ params }) => this.timesheetService.searchTimesheets(params),
    defaultValue: [],
  });
}
