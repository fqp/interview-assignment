import { Component, OnInit } from "@angular/core";

import { Observable, Subject } from "rxjs";

import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { Timesheet } from "../timesheet";
import { TimesheetService } from "../timesheet.service";

@Component({
  selector: "app-timesheet-search",
  templateUrl: "./timesheet-search.component.html",
  styleUrls: ["./timesheet-search.component.css"],
})
export class TimesheetSearchComponent implements OnInit {
  timesheets$!: Observable<Timesheet[]>;
  private searchTerms = new Subject<string>();

  constructor(private timesheetService: TimesheetService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.timesheets$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.timesheetService.searchTimesheets(term))
    );
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
