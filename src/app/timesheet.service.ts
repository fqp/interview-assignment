import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { Timesheet } from "./timesheet";
import { MessageService } from "./message.service";

@Injectable({ providedIn: "root" })
export class TimesheetService {
  private timesheetsUrl = "api/timesheets"; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET timesheets from the server */
  getTimesheets(): Observable<Timesheet[]> {
    return this.http.get<Timesheet[]>(this.timesheetsUrl).pipe(
      tap((_) => this.log("fetched timesheets")),
      catchError(this.handleError<Timesheet[]>("getTimesheets", []))
    );
  }

  /** GET timesheet by id. Return `undefined` when id not found */
  getTimesheetNo404<Data>(id: number): Observable<Timesheet> {
    const url = `${this.timesheetsUrl}/?id=${id}`;
    return this.http.get<Timesheet[]>(url).pipe(
      map((timesheets) => timesheets[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? "fetched" : "did not find";
        this.log(`${outcome} timesheet id=${id}`);
      }),
      catchError(this.handleError<Timesheet>(`getTimesheet id=${id}`))
    );
  }

  /** GET timesheet by id. Will 404 if id not found */
  getTimesheet(id: number): Observable<Timesheet> {
    const url = `${this.timesheetsUrl}/${id}`;
    return this.http.get<Timesheet>(url).pipe(
      tap((_) => this.log(`fetched timesheet id=${id}`)),
      catchError(this.handleError<Timesheet>(`getTimesheet id=${id}`))
    );
  }

  /* GET timesheets whose name contains search term */
  searchTimesheets(term: string): Observable<Timesheet[]> {
    if (!term.trim()) {
      // if not search term, return empty timesheet array.
      return of([]);
    }
    return this.http
      .get<Timesheet[]>(`${this.timesheetsUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found timesheets matching "${term}"`)
            : this.log(`no timesheets matching "${term}"`)
        ),
        catchError(this.handleError<Timesheet[]>("searchTimesheets", []))
      );
  }

  //////// Save methods //////////

  /** POST: add a new timesheet to the server */
  addTimesheet(timesheet: Timesheet): Observable<Timesheet> {
    return this.http
      .post<Timesheet>(this.timesheetsUrl, timesheet, this.httpOptions)
      .pipe(
        tap((newTimesheet: Timesheet) =>
          this.log(`added timesheet w/ id=${newTimesheet.id}`)
        ),
        catchError(this.handleError<Timesheet>("addTimesheet"))
      );
  }

  /** DELETE: delete the timesheet from the server */
  deleteTimesheet(id: number): Observable<Timesheet> {
    const url = `${this.timesheetsUrl}/${id}`;

    return this.http.delete<Timesheet>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted timesheet id=${id}`)),
      catchError(this.handleError<Timesheet>("deleteTimesheet"))
    );
  }

  /** PUT: update the timesheet on the server */
  updateTimesheet(timesheet: Timesheet): Observable<any> {
    return this.http.put(this.timesheetsUrl, timesheet, this.httpOptions).pipe(
      tap((_) => this.log(`updated timesheet id=${timesheet.id}`)),
      catchError(this.handleError<any>("updateTimesheet"))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a TimesheetService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`TimesheetService: ${message}`);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
