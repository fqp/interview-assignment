import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Timesheet } from '../timesheet';
import { TimesheetService } from '../timesheet.service';
import { TimesheetSearch } from '../timesheet-search/timesheet-search';

@Component({
  selector: 'app-timesheet-list',
  imports: [DatePipe, RouterLink, TimesheetSearch],
  templateUrl: './timesheet-list.html',
  styleUrl: './timesheet-list.css',
})
export class TimesheetList {
  private readonly timesheetService = inject(TimesheetService);

  protected readonly timesheets = this.timesheetService.timesheetsResource();
  protected readonly newName = signal('');

  protected async add(): Promise<void> {
    const name = this.newName().trim();
    if (!name) {
      return;
    }

    const startDateTime = new Date();
    const created = await this.timesheetService.addTimesheet({
      name,
      startDateTime,
      endDateTime: startDateTime,
    });

    this.timesheets.update((timesheets) => [...timesheets, created]);
    this.newName.set('');
  }

  protected async delete(timesheet: Timesheet): Promise<void> {
    this.timesheets.update((timesheets) => timesheets.filter((t) => t.id !== timesheet.id));
    await this.timesheetService.deleteTimesheet(timesheet.id);
  }
}
