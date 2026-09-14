import { Component, inject, input, linkedSignal, numberAttribute } from '@angular/core';
import { Location, UpperCasePipe } from '@angular/common';

import { TimesheetService } from '../timesheet.service';

@Component({
  selector: 'app-timesheet-detail',
  imports: [UpperCasePipe],
  templateUrl: './timesheet-detail.html',
  styleUrl: './timesheet-detail.css',
})
export class TimesheetDetail {
  /** Bound from the `detail/:id` route param by `withComponentInputBinding`. */
  readonly id = input.required({ transform: numberAttribute });

  private readonly timesheetService = inject(TimesheetService);
  private readonly location = inject(Location);

  protected readonly timesheet = this.timesheetService.timesheetResource(this.id);

  /** Editable copy of the name, reset whenever a different timesheet loads. */
  protected readonly name = linkedSignal(() => this.timesheet.value()?.name ?? '');

  protected goBack(): void {
    this.location.back();
  }

  protected async save(): Promise<void> {
    const timesheet = this.timesheet.value();
    if (!timesheet) {
      return;
    }

    await this.timesheetService.updateTimesheet({ ...timesheet, name: this.name() });
    this.goBack();
  }
}
