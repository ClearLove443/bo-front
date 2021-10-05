import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformCoreService } from 'src/app/business/services/platform-core.service';
import { MenuItem } from 'src/app/business/states/platform-core.store';
import { PlatformCoreQuery } from '../../../business/queries/platform-core.query';

/**
 * SidebarComponent
 *
 * @export
 * @class SidebarComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input()
  public isCollapsed!: boolean;

  public isShow: boolean | undefined;
  public menuResource = this.platformCoreQuery.select();

  constructor(
    private platformCoreService: PlatformCoreService,
    private platformCoreQuery: PlatformCoreQuery,
    private router: Router
  ) {}

  /**
   * angular life cycle
   *
   * @memberof SidebarComponent
   */
  public ngOnInit(): void {
    this.platformCoreService.getMenuResource();
  }

  /**
   * isSelected
   *
   * @param {string} module
   * @returns {boolean}
   * @memberof SidebarComponent
   */
  public isSelected(module: string): boolean {
    const u = this.router.url;
    return module === u;
  }

  /**
   * isOpen
   *
   * @param {MenuItem[]} menuItems
   * @returns {boolean}
   * @memberof SidebarComponent
   */
  public isOpen(menuItems: MenuItem[]): boolean {
    const u = this.router.url;
    const focusMenu = menuItems.find((menuItem) => menuItem.module === u);
    return focusMenu ? true : false;
  }
}
