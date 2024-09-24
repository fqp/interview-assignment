import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { Timesheet } from "../timesheet";
import { TimesheetService } from "../timesheet.service";

@Component({
  selector: "app-timesheet-detail",
  templateUrl: "./timesheet-detail.component.html",
  styleUrls: ["./timesheet-detail.component.css"],
})
export class TimesheetDetailComponent implements OnInit {
  timesheet: Timesheet | undefined;

  constructor(
    private route: ActivatedRoute,
    private timesheetService: TimesheetService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTimesheet();
  }

  getTimesheet(): void {
    const id = parseInt(this.route.snapshot.paramMap.get("id")!, 10);
    this.timesheetService
      .getTimesheet(id)
      .subscribe((timesheet) => (this.timesheet = timesheet));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.timesheet) {
      this.timesheetService
        .updateTimesheet(this.timesheet)
        .subscribe(() => this.goBack());
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
