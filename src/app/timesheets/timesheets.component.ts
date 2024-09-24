import { Component, OnInit } from "@angular/core";

import { Timesheet } from "../timesheet";
import { TimesheetService } from "../timesheet.service";

@Component({
  selector: "app-timesheets",
  templateUrl: "./timesheets.component.html",
  styleUrls: ["./timesheets.component.css"],
})
export class TimesheetsComponent implements OnInit {
  timesheets: Timesheet[] = [];

  constructor(private timesheetService: TimesheetService) {}

  ngOnInit(): void {
    this.getTimesheets();
  }

  getTimesheets(): void {
    this.timesheetService
      .getTimesheets()
      .subscribe((timesheets) => (this.timesheets = timesheets));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.timesheetService
      .addTimesheet({ name } as Timesheet)
      .subscribe((timesheet) => {
        this.timesheets.push(timesheet);
      });
  }

  delete(timesheet: Timesheet): void {
    this.timesheets = this.timesheets.filter((h) => h !== timesheet);
    this.timesheetService.deleteTimesheet(timesheet.id).subscribe();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
