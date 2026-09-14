import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  protected readonly results = this.timesheetService.searchResource(this.term);
}
