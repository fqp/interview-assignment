import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/timesheets', pathMatch: 'full' },
  {
    path: 'timesheets',
    title: 'Timesheets',
    loadComponent: () => import('./timesheet-list/timesheet-list').then((m) => m.TimesheetList),
  },
  {
    path: 'detail/:id',
    title: 'Timesheet detail',
    loadComponent: () =>
      import('./timesheet-detail/timesheet-detail').then((m) => m.TimesheetDetail),
  },
];
