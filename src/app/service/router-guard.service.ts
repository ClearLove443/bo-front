import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

/**
 * RouterGuardService
 *
 * @export
 * @class RouterGuardService
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root',
})
export class RouterGuardService implements CanActivate {
  constructor(private router: Router) {}

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
    // alert(_state.url);
    const token = localStorage.getItem('token');
    // alert('token' + token);
    if (!token) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
