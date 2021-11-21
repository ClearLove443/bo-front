import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthQuery } from '../auth/auth.query';

/**
 * DefaultRouterGuardService
 *
 * @export
 * @class DefaultRouterGuardService
 * @implements {CanActivate}
 */
export abstract class DefaultRouterGuardService implements CanActivate {
  constructor(protected router: Router, protected auth: AuthQuery) {}

  /**
   * canActivate
   *
   * @param {ActivatedRouteSnapshot} _route
   * @param {RouterStateSnapshot} _state
   * @returns {boolean}
   * @memberof RouterGuardService
   */
  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): boolean {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
    if (!this.auth.isLogin()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
