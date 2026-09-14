import { Timesheet } from './timesheet';

/** How many hours a single timesheet covers. */
export function durationInHours(timesheet: Timesheet): number {
  const start = new Date(timesheet.startDateTime);
  const end = new Date(timesheet.endDateTime);

  return end.getHours() - start.getHours() + (end.getMinutes() - start.getMinutes()) / 60;
}

/** The Monday that starts the week `date` falls in. */
export function startOfWeek(date: Date): Date {
  const monday = new Date(date);
  monday.setDate(date.getDate() - date.getDay() + 1);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

/** Whether `date` falls in the week beginning at `weekStart`. */
export function isInWeek(date: Date, weekStart: Date): boolean {
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  return date >= weekStart && date <= weekEnd;
}
