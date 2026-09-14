import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Timesheet } from './timesheet';

const PERSONS = [
  'Dr. Nice',
  'Bombasto',
  'Celeritas',
  'Magneta',
  'RubberMan',
  'Dynama',
  'Dr. IQ',
  'Magma',
  'Tornado',
];

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { timesheets: Timesheet[] } {
    const timesheets: Timesheet[] = [];

    for (let i = 0; i < 10; i++) {
      const startDateTime = randomStartDateTime();
      timesheets.push({
        id: i + 1,
        name: PERSONS[i % PERSONS.length],
        startDateTime,
        endDateTime: randomEndDateTime(startDateTime),
      });
    }

    return { timesheets };
  }

  /**
   * Overrides `genId` so a timesheet always gets an id. Returns 11 for an empty
   * database, otherwise the highest existing id plus one.
   */
  genId(timesheets: Timesheet[]): number {
    return timesheets.length > 0 ? Math.max(...timesheets.map((t) => t.id)) + 1 : 11;
  }
}

function randomStartDateTime(): Date {
  const date = new Date();
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date;
}

function randomEndDateTime(after: Date): Date {
  const date = new Date(after);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  date.setHours(hours + Math.floor(Math.random() * (24 - hours)));
  date.setMinutes(minutes + Math.floor(Math.random() * (60 - minutes)));
  return date;
}
