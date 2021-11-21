import { HttpInterceptor } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { AuthQuery } from '../core/auth/auth.query';
import { DefaultHttpInterceptor } from '../core/http-interceptors/default-http-interceptor';

export const DEFAULT_HTTP_TIMEOUT = new InjectionToken<number>(
  'defaultTimeout'
);

/**
 * angular httpclient header inspect class
 *
 * @export
 * @class AuthInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class WebAppHttpInterceptor extends DefaultHttpInterceptor {
  /**
   * Creates an instance of DefaultHttpInterceptor.
   * @param {number} defaultTimeout
   * @param {Injector} injector
   * @memberof DefaultHttpInterceptor
   */
  constructor(
    @Inject(DEFAULT_HTTP_TIMEOUT) protected defaultTimeout: number,
    protected auth: AuthQuery
  ) {
    super(defaultTimeout, auth);
  }
}
