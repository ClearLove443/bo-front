import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { AuthQuery } from '../auth/auth.query';
import {
  ApiSystemError,
  ApiValidationError,
  AuthenticationError,
  MaintenanceError,
  NetworkError,
} from '../error-handler/errors';

/**
 * angular httpclient header inspect class
 *
 * @export
 * @class AuthInterceptor
 * @implements {HttpInterceptor}
 */
export abstract class DefaultHttpInterceptor implements HttpInterceptor {
  // protected defaultTimeout!: number;
  protected auth!: AuthQuery;
  constructor(protected defaultTimeout: number, auth: AuthQuery) {
    // this.defaultTimeout = defaultTimeout;
    // this.auth = auth;
  }
  intercept(
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
    const authToken = this.auth.getAuthorizationToken();
    // const authToken = localStorage.getItem('token');
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const defReq = req.clone({
      url: targetUrl,
      headers: req.headers.set('Authorization', `${authToken}`),
    });
    // send cloned request with header to the next handler.
    return next.handle(defReq).pipe(
      timeout(timeoutValue),
      catchError((error) => {
        console.error('DefaulHttpInterceptor', error);
        // return EMPTY;
        return this.switchError(error);
      })
    );
  }
  /**
   * switch errors
   *
   * @protected
   * @param {HttpErrorResponse} error
   * @returns {Observable<never>}
   * @memberof DefaultHttpInterceptor
   */
  protected switchError(error: HttpErrorResponse): Observable<never> {
    if (
      error.error instanceof Blob &&
      error.error.type === 'application/json'
    ) {
      // handle error response for blob
      // from angular issue
      // https://github.com/angular/angular/issues/19888#issuecomment-522119151
      return new Observable((observer) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          try {
            const newError = { ...error };
            const errorMessage = JSON.parse(e.target.result);
            newError.error = errorMessage;
            observer.error(this.createApplicationError(newError));
          } catch (observerError) {
            observer.error(observerError);
          }
        };
        reader.onerror = () => {
          observer.error(this.createApplicationError(error));
        };
        reader.readAsText(error.error);
      });
    }
    return throwError(this.createApplicationError(error));
  }
  /**
   * create ApplicationError from error response status code
   *
   * @private
   * @param {HttpErrorResponse} error
   * @returns {ApplicationError}
   * @memberof DefaultHttpInterceptor
   */
  private createApplicationError(error: HttpErrorResponse): any {
    switch (error.status) {
      case 400:
        return new ApiValidationError(error);
      case 401:
        return new AuthenticationError(error);
      case 500:
        return new ApiSystemError(error);
      case 503:
        return new MaintenanceError(error);
      default:
        return new NetworkError(error);
    }
  }
}
