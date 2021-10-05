import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

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
export class WebAppHttpInterceptor implements HttpInterceptor {
  /**
   * Creates an instance of DefaultHttpInterceptor.
   * @param {number} defaultTimeout
   * @param {Injector} injector
   * @memberof DefaultHttpInterceptor
   */
  constructor(
    @Inject(DEFAULT_HTTP_TIMEOUT) protected defaultTimeout: number // protected auth: AuthQuery
  ) {
    // super(defaultTimeout, auth);
  }

  /**
   * Intercept angular http connection
   *
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   * @memberof DefaultHttpInterceptor
   */
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // to call APIs hosted on localhost from Android emulator
    // TODO: still need to consider calling API from real devices
    const targetUrl = req.url;

    // get timeout value
    const timeoutValue =
      Number(req.headers.get('timeout')) || this.defaultTimeout;

    // Get the auth token from the service.
    // const authToken = this.auth.getAuthorizationToken();

    const authToken = localStorage.getItem('token');

    // alert(targetUrl + authToken);
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const defReq = req.clone({
      url: targetUrl,
      headers: req.headers.set('X-Chatworks-Auth', `${authToken}`),
    });

    // send cloned request with header to the next handler.
    return next.handle(defReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const body = event.body;
          // this.convertToDate(body);
        }
      }),
      timeout(timeoutValue),
      catchError((error) => {
        alert(JSON.stringify(error));
        return EMPTY;
      })
    );
  }
}
