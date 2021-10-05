import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Dashboard, DashboardStore } from './dashboard.store';

@Injectable({ providedIn: 'root' })
export class DashboardQuery extends Query<Dashboard> {
  constructor(protected store: DashboardStore) {
    super(store);
  }
}
