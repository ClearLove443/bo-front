import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

/**
 * IRouteConfigData
 *
 * @interface IRouteConfigData
 */
interface IRouteConfigData {
  reuse: boolean;
}

/**
 * ICachedRoute
 *
 * @interface ICachedRoute
 */
interface ICachedRoute {
  handle: DetachedRouteHandle;
  data: IRouteConfigData;
}

/**
 * AppReuseStrategy
 *
 * @export
 * @class AppReuseStrategy
 * @implements {RouteReuseStrategy}
 */
@Injectable()
export class AppReuseStrategy implements RouteReuseStrategy {
  private static routeCache: Map<string, ICachedRoute> | null = new Map<
    string,
    ICachedRoute
  >();
  private static waitDelete: string | null;
  private static currentDelete: string | null;

  /**
   * deleteRouteSnapshot
   *
   * @static
   * @param {string} url
   * @memberof AppReuseStrategy
   */
  public static deleteRouteSnapshot(url: string): void {
    if (url[0] === '/') {
      url = url.substring(1);
    }
    url = url.replace('/', '_');
    if (AppReuseStrategy.routeCache!.has(url)) {
      AppReuseStrategy.routeCache!.delete(url);
      AppReuseStrategy.currentDelete = url;
    } else {
      AppReuseStrategy.waitDelete = url;
    }
  }

  /**
   * shouldReuseRoute
   *
   * @param {ActivatedRouteSnapshot} future
   * @param {ActivatedRouteSnapshot} curr
   * @returns {boolean}
   * @memberof AppReuseStrategy
   */
  public shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  /**
   * shouldDetach
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {boolean}
   * @memberof AppReuseStrategy
   */
  public shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const data = this.getRouteData(route);
    if (data) {
      return true;
    }
    return false;
  }

  /**
   * store
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {DetachedRouteHandle} handle
   * @returns {void}
   * @memberof AppReuseStrategy
   */
  public store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    const url = this.getFullRouteUrl(route);
    const data = this.getRouteData(route)!;
    if (AppReuseStrategy.waitDelete && AppReuseStrategy.waitDelete === url) {
      AppReuseStrategy.waitDelete = null;
    } else {
      if (
        AppReuseStrategy.currentDelete &&
        AppReuseStrategy.currentDelete === url
      ) {
        AppReuseStrategy.currentDelete = null;
      } else {
        AppReuseStrategy.routeCache!.set(url, { handle, data });
        this.addRedirectsRecursively(route);
      }
    }
  }

  /**
   * shouldAttach
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {boolean}
   * @memberof AppReuseStrategy
   */
  public shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const url = this.getFullRouteUrl(route);
    return AppReuseStrategy.routeCache!.has(url);
  }

  /**
   * retrieve
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {DetachedRouteHandle}
   * @memberof AppReuseStrategy
   */
  public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const url = this.getFullRouteUrl(route);
    const data = this.getRouteData(route);
    return data && AppReuseStrategy.routeCache!.has(url)
      ? AppReuseStrategy.routeCache!.get(url)!.handle
      : null;
  }

  /**
   *addRedirectsRecursively
   *
   * @private
   * @param {ActivatedRouteSnapshot} route
   * @memberof AppReuseStrategy
   */
  private addRedirectsRecursively(route: ActivatedRouteSnapshot): void {
    const config = route.routeConfig;
    if (config) {
      if (!config.loadChildren) {
        const routeFirstChild = route.firstChild;
        const routeFirstChildUrl = routeFirstChild
          ? this.getRouteUrlPaths(routeFirstChild).join('/')
          : '';
        const childConfigs = config.children;
        if (childConfigs) {
          const childConfigWithRedirect = childConfigs.find(
            (c) => c.path === '' && !!c.redirectTo
          );
          if (childConfigWithRedirect) {
            childConfigWithRedirect.redirectTo = routeFirstChildUrl;
          }
        }
      }
      route.children.forEach((childRoute) =>
        this.addRedirectsRecursively(childRoute)
      );
    }
  }

  /**
   * getFullRouteUrl
   *
   * @private
   * @param {ActivatedRouteSnapshot} route
   * @returns {string}
   * @memberof AppReuseStrategy
   */
  private getFullRouteUrl(route: ActivatedRouteSnapshot): string {
    return this.getFullRouteUrlPaths(route)
      .filter(Boolean)
      .join('/')
      .replace('/', '_');
  }

  /**
   * getFullRouteUrlPaths
   *
   * @private
   * @param {ActivatedRouteSnapshot} route
   * @returns {string[]}
   * @memberof AppReuseStrategy
   */
  private getFullRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
    const paths = this.getRouteUrlPaths(route);
    return route.parent
      ? [...this.getFullRouteUrlPaths(route.parent), ...paths]
      : paths;
  }

  /**
   * getRouteUrlPaths
   *
   * @private
   * @param {ActivatedRouteSnapshot} route
   * @returns {string[]}
   * @memberof AppReuseStrategy
   */
  private getRouteUrlPaths(route: ActivatedRouteSnapshot): string[] {
    return route.url.map((urlSegment) => urlSegment.path);
  }

  /**
   * getRouteData
   *
   * @private
   * @param {ActivatedRouteSnapshot} route
   * @returns {IRouteConfigData}
   * @memberof AppReuseStrategy
   */
  private getRouteData(route: ActivatedRouteSnapshot): IRouteConfigData | null {
    return route.routeConfig && (route.routeConfig.data as IRouteConfigData);
  }
}
