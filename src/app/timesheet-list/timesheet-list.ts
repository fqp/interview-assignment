import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Timesheet } from '../timesheet';
import { TimesheetService } from '../timesheet.service';
import { TimesheetSearch } from '../timesheet-search/timesheet-search';
import { WeeklySummary } from '../weekly-summary/weekly-summary';

@Component({
  selector: 'app-timesheet-list',
  imports: [DatePipe, RouterLink, TimesheetSearch, WeeklySummary],
  templateUrl: './timesheet-list.html',
  styleUrl: './timesheet-list.css',
})
export class TimesheetList {
  private readonly timesheetService = inject(TimesheetService);

  protected readonly timesheets = this.timesheetService.timesheetsResource();
  protected readonly newName = signal('');

  protected add(): void {
    const name = this.newName().trim();
    if (!name) {
      return;
    }

    const startDateTime = new Date();
    this.timesheetService
      .addTimesheet({ name, startDateTime, endDateTime: startDateTime })
      .subscribe((created) => {
        if (created) {
          this.timesheets.update((timesheets) => [...timesheets, created]);
          this.newName.set('');
        }
      });
  }

  protected delete(timesheet: Timesheet): void {
    this.timesheets.update((timesheets) => timesheets.filter((t) => t.id !== timesheet.id));
    this.timesheetService.deleteTimesheet(timesheet.id).subscribe();
  }
}
