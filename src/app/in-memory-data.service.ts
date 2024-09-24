import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Timesheet } from "./timesheet";

@Injectable({
  providedIn: "root",
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const timesheets = [];
    for (let i = 0; i < 10; i++) {
      const startDateTime = getRandomStartDateTime();
      timesheets.push({
        id: i + 1,
        name: persons[i % persons.length],
        startDateTime: startDateTime,
        endDateTime: getRandomEndDateTime(startDateTime),
      });
    }

    return { timesheets };
  }

  // Overrides the genId method to ensure that a timesheet always has an id.
  // If the timesheets array is empty,
  // the method below returns the initial number (11).
  // if the timesheets array is not empty, the method below returns the highest
  // timesheet id + 1.
  genId(timesheets: Timesheet[]): number {
    return timesheets.length > 0
      ? Math.max(...timesheets.map((timesheet) => timesheet.id)) + 1
      : 11;
  }
}

const persons = [
  "Dr. Nice",
  "Bombasto",
  "Celeritas",
  "Magneta",
  "RubberMan",
  "Dynama",
  "Dr. IQ",
  "Magma",
  "Tornado",
];

function getRandomStartDateTime() {
  const date = new Date();
  date.setHours(Math.floor(Math.random() * 24));
  date.setMinutes(Math.floor(Math.random() * 60));
  return date;
}

function getRandomEndDateTime(after: Date) {
  const date = new Date(after);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  date.setHours(hours + Math.floor(Math.random() * (24 - hours)));
  date.setMinutes(minutes + Math.floor(Math.random() * (60 - minutes)));
  return date;
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
