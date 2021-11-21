import { Injectable, Injector } from '@angular/core';
import { GlobalErrorHandler } from '../core/error-handler/error-handler';
/**
 * Core mobile exception handler
 *
 * @export
 * @class WebAppGlobalErrorHandler
 * @implements {ErrorHandler}
 */
@Injectable()
export class WebAppGlobalErrorHandler extends GlobalErrorHandler {
  /**
   * Creates an instance of GlobalErrorHandler.
   *
   * @param {Injector} injector Injector
   * @memberof WebAppGlobalErrorHandler
   */
  constructor(protected injector: Injector) {
    super(injector);
  }
}
