import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { EnvUtil } from 'src/environments/environment';
import { ChartXY, DashboardStore } from './dashboard.store';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(
    private dashboardStore: DashboardStore,
    private http: HttpClient
  ) {}

  /**
   * getDashboardInfo
   *
   * @memberof DashboardService
   */
  public getDashboardInfo(): void {
    const serviceRootUrl = EnvUtil.env.apiUrl.charts;
    this.dashboardStore.update({
      loading: true,
      loading2: true,
    });

    this.http
      .get<{ data: Array<ChartXY> }>(serviceRootUrl + '/visitData')
      .pipe(delay(2000))
      .subscribe((result) => {
        this.dashboardStore.update({
          visitData: result.data,
          loading: false,
        });
      });

    this.http
      .get<{ data: number }>(serviceRootUrl + '/totalSalePercent')
      .subscribe((result) => {
        this.dashboardStore.update({
          totalSalePercent: result.data,
        });
      });

    this.http
      .get<{ data: Array<ChartXY> }>(serviceRootUrl + '/saleTrend')
      .pipe(delay(2000))
      .subscribe((result) => {
        this.dashboardStore.update({
          saleTrendData: result.data,
          loading2: false,
        });
      });
  }
}
