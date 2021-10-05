import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface DashboardState {
  key: string;
}

/**
 * ChartXY
 *
 * @export
 * @interface ChartXY
 */
export interface ChartXY {
  y: number;
  x: string;
}

/**
 * Dashboard
 *
 * @export
 * @interface Dashboard
 */
export interface Dashboard {
  visitData: Array<ChartXY>;
  saleTrendData: Array<ChartXY>;
  totalSalePercent: number;
  loading: boolean;
  loading2: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'dashboard' })
export class DashboardStore extends Store<Dashboard> {
  constructor() {
    super({});
  }
}
