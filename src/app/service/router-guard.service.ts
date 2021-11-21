import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthQuery } from '../core/auth/auth.query';
import { DefaultRouterGuardService } from '../core/router-guard/default-router-guard.service';

/**
 * RouterGuardService
 *
 * @export
 * @class RouterGuardService
 * @implements {CanActivate}
 */
@Injectable({ providedIn: 'root' })
export class RouterGuardService extends DefaultRouterGuardService {
  constructor(protected router: Router, protected auth: AuthQuery) {
    super(router, auth);
  }
}
