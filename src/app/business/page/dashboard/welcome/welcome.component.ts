import { Component, OnInit } from '@angular/core';
import { DashboardQuery } from 'src/app/business/queries/dashboard.query';
import { DashboardService } from 'src/app/business/services/dashboard.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public chartLoading = {
    saleTrendDelay: 0,
  };
  public dashboardInfo = this.dashboardQuery.select();

  /**
   *Creates an instance of HomeComponent.
   * @param {HttpClient} http
   * @memberof HomeComponent
   */
  constructor(
    private dashboardService: DashboardService,
    private dashboardQuery: DashboardQuery
  ) {}

  /**
   * angular life cycle
   *
   * @returns {void}
   * @memberof HomeComponent
   */
  public ngOnInit(): void {
    this.dashboardService.getDashboardInfo();
  }

  /**
   * saleTabChange
   *
   * @param {*} event
   * @memberof HomeComponent
   */
  public saleTabChange(event: any): void {
    const index = event.nzSelectedIndex;
    this.chartLoading.saleTrendDelay = index;
    // g2 bug
    const e = document.createEvent('Event');
    e.initEvent('resize', true, true);
    window.dispatchEvent(e);
  }
}
