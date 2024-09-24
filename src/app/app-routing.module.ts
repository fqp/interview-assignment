import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TimesheetsComponent } from "./timesheets/timesheets.component";
import { TimesheetDetailComponent } from "./timesheet-detail/timesheet-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/timesheets", pathMatch: "full" },
  { path: "detail/:id", component: TimesheetDetailComponent },
  { path: "timesheets", component: TimesheetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
