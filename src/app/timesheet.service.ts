import { Injectable, Signal, inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { Timesheet } from './timesheet';

@Injectable({ providedIn: 'root' })
export class TimesheetService {
  private readonly http = inject(HttpClient);

  private readonly timesheetsUrl = 'api/timesheets';

  /**
   * A resource holding every timesheet. Call from an injection context; the
   * caller owns the resource and can `reload()` or locally `update()` it.
   */
  timesheetsResource() {
    return httpResource<Timesheet[]>(() => this.timesheetsUrl, { defaultValue: [] });
  }

  /** A resource for a single timesheet, refetching whenever `id` changes. */
  timesheetResource(id: Signal<number | undefined>) {
    return httpResource<Timesheet | undefined>(() => {
      const current = id();
      return current === undefined ? undefined : `${this.timesheetsUrl}/${current}`;
    });
  }

  /** A resource holding the timesheets whose name matches `term`. */
  searchResource(term: Signal<string>) {
    return httpResource<Timesheet[]>(() => `${this.timesheetsUrl}/?name=${term()}`, {
      defaultValue: [],
    });
  }

  /** POST: add a new timesheet to the server. */
  async addTimesheet(timesheet: Omit<Timesheet, 'id'>): Promise<Timesheet> {
    return await firstValueFrom(this.http.post<Timesheet>(this.timesheetsUrl, timesheet));
  }

  /** PUT: update the timesheet on the server. */
  async updateTimesheet(timesheet: Timesheet): Promise<void> {
    await firstValueFrom(this.http.put(this.timesheetsUrl, timesheet));
  }

  /** DELETE: remove the timesheet from the server. */
  async deleteTimesheet(id: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.timesheetsUrl}/${id}`));
  }
}
