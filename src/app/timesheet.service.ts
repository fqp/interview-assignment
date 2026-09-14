import { Injectable, Signal, inject } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

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

  /** GET timesheets whose name contains `term`. */
  searchTimesheets(term: string): Observable<Timesheet[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http
      .get<Timesheet[]>(`${this.timesheetsUrl}/?name=${term}`)
      .pipe(catchError(this.handleError<Timesheet[]>('searchTimesheets', [])));
  }

  /** POST: add a new timesheet to the server. */
  addTimesheet(timesheet: Omit<Timesheet, 'id'>): Observable<Timesheet | undefined> {
    return this.http
      .post<Timesheet>(this.timesheetsUrl, timesheet)
      .pipe(catchError(this.handleError<Timesheet | undefined>('addTimesheet', undefined)));
  }

  /** PUT: update the timesheet on the server. */
  updateTimesheet(timesheet: Timesheet): Observable<unknown> {
    return this.http
      .put(this.timesheetsUrl, timesheet)
      .pipe(catchError(this.handleError<unknown>('updateTimesheet', undefined)));
  }

  /** DELETE: remove the timesheet from the server. */
  deleteTimesheet(id: number): Observable<unknown> {
    return this.http
      .delete(`${this.timesheetsUrl}/${id}`)
      .pipe(catchError(this.handleError<unknown>('deleteTimesheet', undefined)));
  }

  /**
   * Handles a failed HTTP operation by logging it and letting the app carry on
   * with a fallback value.
   */
  private handleError<T>(operation: string, result: T) {
    return (error: unknown): Observable<T> => {
      // TODO: report this to real logging infrastructure instead of the console.
      console.error(`${operation} failed`, error);
      return of(result);
    };
  }
}
