import { Component, computed, effect, input, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';

import { Timesheet } from '../timesheet';
import { durationInHours, isInWeek, startOfWeek } from '../timesheet-hours';

interface PersonTotal {
  name: string;
  hours: number;
}

/** A shift longer than this counts as overtime. */
const OVERTIME_THRESHOLD_HOURS = 8;

@Component({
  selector: 'app-weekly-summary',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './weekly-summary.html',
  styleUrl: './weekly-summary.css',
})
export class WeeklySummary {
  readonly timesheets = input.required<readonly Timesheet[]>();

  protected readonly weekStart = startOfWeek(new Date());

  /** Hours worked per person this week, busiest first. */
  protected readonly totals = computed<PersonTotal[]>(() => {
    const hoursByPerson = new Map<string, number>();

    for (const timesheet of this.timesheets()) {
      if (!isInWeek(new Date(timesheet.startDateTime), this.weekStart)) {
        continue;
      }

      const current = hoursByPerson.get(timesheet.name) ?? 0;
      hoursByPerson.set(timesheet.name, current + durationInHours(timesheet));
    }

    return [...hoursByPerson.entries()]
      .map(([name, hours]) => ({ name, hours }))
      .sort((a, b) => b.hours - a.hours);
  });

  /** How many shifts this week ran past the overtime threshold. */
  protected readonly overtimeShifts = signal(0);

  constructor() {
    effect(() => {
      for (const timesheet of this.timesheets()) {
        if (durationInHours(timesheet) > OVERTIME_THRESHOLD_HOURS) {
          this.overtimeShifts.update((count) => count + 1);
        }
      }
    });
  }

  protected readonly totalHours = computed(() =>
    this.totals().reduce((sum, total) => sum + total.hours, 0),
  );
}
