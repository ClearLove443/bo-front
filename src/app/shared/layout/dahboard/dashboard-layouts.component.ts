import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { ReuseTabComponent } from '../reuse-tab/reuse-tab.component';

/**
 * DashboardLayoutsComponent
 *
 * @export
 * @class DashboardLayoutsComponent
 * @implements {AfterViewInit}
 */
@Component({
  selector: 'app-dashboard-layouts',
  templateUrl: './dashboard-layouts.component.html',
  styleUrls: ['./dashboard-layouts.component.scss'],
})
export class DashboardLayoutsComponent implements AfterViewInit, OnInit {
  public isCollapsed: boolean = false;
  public triggerTemplate: TemplateRef<void> | null = null;
  public sidebarWidth: any = 256;
  public tabWidth: any = 0;

  @ViewChild('trigger', { static: false })
  public customTrigger!: TemplateRef<void>;
  @ViewChild('reuseTab', { static: false }) public reuseTab!: ReuseTabComponent;

  constructor(
    // private coreQuery: CoreQuery,
    private hst: ElementRef
  ) {}

  /**
   * angular life cycle
   *
   * @memberof DashboardLayoutsComponent
   */
  public ngOnInit(): void {}

  /**
   * angular life cycle
   *
   * @memberof DashboardLayoutsComponent
   */
  public ngAfterViewInit(): void {
    fromEvent(window, 'resize').subscribe((_event: any) => {
      this.smartDetection();
      this.doLayout();
    });
    setTimeout(() => {
      this.smartDetection();
      this.doLayout();
    }, 500);
  }

  /**
   * changeTrigger
   *
   * @memberof DashboardLayoutsComponent
   */
  public changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }

  /**
   * collapsedTrigger
   *
   * @memberof DashboardLayoutsComponent
   */
  public collapsedTrigger(): void {
    this.isCollapsed = !this.isCollapsed;
    this.doLayout();
    // G2 bug
    const e = document.createEvent('Event');
    e.initEvent('resize', true, true);
    window.dispatchEvent(e);
  }

  /**
   * tabSize
   *
   * @param {number} n
   * @memberof DashboardLayoutsComponent
   */
  public tabSize(n: number): void {
    this.tabWidth = n;
  }

  /**
   * doLayout
   *
   * @memberof DashboardLayoutsComponent
   */
  public doLayout(): void {
    this.reuseTab.tabResize(this.sidebarWidth);
  }

  /**
   * smartDetection
   *
   * @private
   * @memberof DashboardLayoutsComponent
   */
  private smartDetection(): void {
    if (window.innerWidth < 500) {
      this.hst.nativeElement.querySelector('nz-sider').style.display = 'none';
      this.isCollapsed = true;
    } else if (window.innerWidth < 1000) {
      this.hst.nativeElement.querySelector('nz-sider').style.display = '';
      this.isCollapsed = true;
    }
  }
}
