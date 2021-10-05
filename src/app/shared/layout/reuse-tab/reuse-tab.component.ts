import { Component, EventEmitter, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { PlatformCoreService } from 'src/app/business/services/platform-core.service';

/**
 * ReuseTabComponent
 *
 * @export
 * @class ReuseTabComponent
 */
@Component({
  selector: 'app-reuse-tab',
  templateUrl: './reuse-tab.component.html',
  styleUrls: ['./reuse-tab.component.scss'],
})
export class ReuseTabComponent {
  public currentIndex = -1;
  public currentOverIndex = -1;
  public tabRealWidth: any;
  public sidebarWidth = 256;

  @Output() public changeTabSize: EventEmitter<number> = new EventEmitter();

  public tabItemList: Array<{
    title: string;
    module: string;
    power: string;
    isSelect: boolean;
  }> = [];

  public tabItemShowList: Array<{
    title: string;
    module: string;
    power: string;
    isSelect: boolean;
  }> = [];

  public tabItemCollapsedList: Array<{
    title: string;
    module: string;
    power: string;
    isSelect: boolean;
  }> = [];

  public isCollapsedTab: boolean | undefined;

  /**
   * Creates an instance of ReuseTabComponent.
   * @param {ElementRef} hst
   * @param {PlatformCoreService} platformCoreService
   * @param {Router} router
   * @param {ActivatedRoute} activatedRoute
   * @param {Title} titleService
   * @memberof ReuseTabComponent
   */
  constructor(
    private platformCoreService: PlatformCoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    const firstUrl: {
      title: string;
      module: string;
      power: string;
      isSelect: boolean;
    } = this.platformCoreService.getDesktop();
    this.tabItemList.push(firstUrl);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((routeData) => {
        const url = this.router.url;
        this.titleService.setTitle(routeData.title);
        const exitMenu = this.tabItemList.find((p) => p.module === url);
        if (!exitMenu) {
          this.tabItemList.push({
            title: routeData.title,
            module: url,
            power: '',
            isSelect: true,
          });
          this.tabResize(this.sidebarWidth);
        }
        this.tabItemList.forEach((p) => (p.isSelect = p.module === url));
        this.currentIndex = this.tabItemList.findIndex((p) => p.module === url);
      });
  }

  /**
   * close tab
   *
   * @param {string} module
   * @param {boolean} isSelect
   * @param {Event} event
   * @returns {void}
   * @memberof ReuseTabComponent
   */
  public closeTab(module: string, isSelect: boolean, event: Event): void {
    event.preventDefault();
    const index = this.tabItemList.findIndex((p) => p.module === module);
    if (this.tabItemList.length === 1) {
      return;
    }
    // delete AppReuseStrategy.deleteRouteSnapshot[module];
    if (!isSelect) {
      return;
    }
    let menu = this.tabItemList[index + 1];
    if (!menu) {
      menu = this.tabItemList[index - 1];
    }
    this.tabItemList.forEach((p) => (p.isSelect = p.module === menu.module));
    this.tabItemList = this.tabItemList.filter((p) => p.module !== module);
    this.router.navigate(['/' + menu.module]);
    this.tabResize(this.sidebarWidth);
  }

  /**
   * tabResize
   *
   * @param {*} [sw]
   * @memberof ReuseTabComponent
   */
  public tabResize(sw?: any): void {
    const winWidth = document.body.offsetWidth;
    this.sidebarWidth = sw !== undefined ? sw : 256;
    const sidebarCollapsedWidth = 68;
    const headerWidth = 180;
    const menuDrapDownWidth = 38;
    const tabItemWidth = 96;
    const tabMaxWidth =
      winWidth - this.sidebarWidth - sidebarCollapsedWidth - headerWidth - 2;
    this.tabRealWidth = tabMaxWidth - menuDrapDownWidth;
    this.changeTabSize.emit(tabMaxWidth);
    const tabMaxNum = Math.floor(this.tabRealWidth / tabItemWidth);
    let tabNum =
      this.tabItemList.length > tabMaxNum ? tabMaxNum : this.tabItemList.length;
    if (tabNum < 0) {
      tabNum = 0;
    }
    this.tabItemShowList = this.tabItemList.slice(0, tabNum);
    this.tabItemCollapsedList = this.tabItemList.slice(tabNum);
    if (this.tabItemList.length > tabNum) {
      this.isCollapsedTab = true;
    } else {
      this.isCollapsedTab = false;
    }
  }

  /**
   * tabItemShowSelect
   *
   * @param {*} ev
   * @param {number} index
   * @memberof ReuseTabComponent
   */
  public tabItemShowSelect(_ev: any, index: number): void {
    this.currentIndex = index;
    const menu = this.tabItemShowList[this.currentIndex];
    this.router.navigate([menu.module]);
  }

  /**
   * tabItemCollapsedSelect
   *
   * @param {*} ev
   * @param {number} index
   * @memberof ReuseTabComponent
   */
  public tabItemCollapsedSelect(_ev: any, index: number): void {
    this.currentIndex = index;
    const menu = this.tabItemCollapsedList[this.currentIndex];
    this.router.navigate([menu.module]);
  }

  /**
   * showClose
   *
   * @param {string} tabItem
   * @param {number} i
   * @returns {void}
   * @memberof ReuseTabComponent
   */
  public showClose(tabItem: string, i: number): void {
    if (i === 0 && tabItem === '__tabItemShow') {
      return;
    }
    this.currentOverIndex = i;
    document.getElementById(tabItem + i)!.style.display = 'inline-block';
  }

  /**
   * hideClose
   *
   * @param {string} tabItem
   * @param {number} i
   * @memberof ReuseTabComponent
   */
  public hideClose(tabItem: string, i: number): void {
    this.currentOverIndex = i;
    document.getElementById(tabItem + i)!.style.display = 'none';
  }
}
