import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface MenuItem {
  module: string;
  children: Array<MenuItem>;
  label: string;
  isGroup?: boolean;
  icon: string;
}

/**
 * ChartXY
 *
 * @export
 * @interface ChartXY
 */
export interface UserInfo {
  token: string;
  userName: string;
  roles: [];
}

/**
 * ChartXY
 *
 * @export
 * @interface ChartXY
 */
export interface Platform {
  userinfo: UserInfo;
  menuItem: MenuItem[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'platform-core' })
export class PlatformCoreStore extends Store<Platform> {
  constructor() {
    super({});
  }
}
