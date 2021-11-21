import { ErrorHandler, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from '../auth/auth.service';
/**
 * Core mobile exception handler
 *
 * @export
 * @class GlobalErrorHandler
 * @implements {ErrorHandler}
 */
export abstract class GlobalErrorHandler implements ErrorHandler {
  /**
   * Creates an instance of GlobalErrorHandler.
   *
   * @param {Injector} injector Injector
   * @memberof GlobalErrorHandler
   */
  constructor(protected injector: Injector) {}
  /**
   * Exception handler
   *
   * @param {*} error error object
   * @memberof GlobalErrorHandler
   */
  public handleError(error: any): void {
    console.error('ErrorHandler', error);

    // throw error;
    // const loggerService = this.injector.get(LoggerService);
    const translate = this.injector.get(TranslateService);
    // Promise rejection
    if (error.promise && error.rejection && error.rejection instanceof Error) {
      error = error.rejection;
    }
    // Create logger message
    let message = error.message ? error.message : error.toString();
    let businessMessageTitle = null;
    let businessMessage = null;
    // Override dialog messages
    if (error.businessMessage) {
      businessMessage = error.businessMessage;
      businessMessageTitle = error.businessMessageTitle;
    }
    // NetworkError
    if (error.name && error.name === 'NetworkError' && !businessMessage) {
      businessMessage = translate.instant('SystemMessages.SystemErrorNetwork');
    }
    // NetworkError (API Not Found)
    if (error.name && error.name === 'HttpErrorResponse' && !businessMessage) {
      businessMessage = translate.instant('SystemMessages.SystemErrorNetwork');
    }
    // ApiSystemError
    if (error.name && error.name === 'ApiSystemError' && !businessMessage) {
      businessMessage = translate.instant('SystemMessages.SystemErrorApi');
    }
    // AuthenticationError
    if (error.name && error.name === 'AuthenticationError') {
      if (!businessMessage) {
        businessMessage = translate.instant('SystemMessages.SystemErrorAuth');
      }
      const authService = this.injector.get(AuthService);
      authService.logout();
    }
    // Maintenance
    if (error.name && error.name === 'MaintenanceError' && !businessMessage) {
      businessMessage = translate.instant(
        'SystemMessages.SystemErrorMaintenance'
      );
    }
    // loggerService.systemError({
    //   message: (businessMessage ? businessMessage : '') + message,
    //   error: error instanceof HttpErrorResponse ? null : error,
    // });
    // Other system error
    if (!businessMessage) {
      businessMessage = translate.instant('SystemMessages.SystemErrorFatal');
    }
    if (!!error) {
      this.showSystemErrorDialog(
        businessMessageTitle
          ? businessMessageTitle
          : translate.instant('SystemMessages.SystemErrorTitle'),
        businessMessage ? businessMessage : message,
        translate.instant('Button.CLOSE')
      );
    }
  }

  /**
   * Show the system error dialog.
   *
   * @private
   * @memberof WebAppGlobalErrorHandler
   */
  public showSystemErrorDialog(
    title: string,
    message: string,
    okButtonTitle: string
  ): void {
    const modalService = this.injector.get(NzModalService);
    modalService.error({
      nzTitle: title,
      nzContent: message,
      nzOkText: okButtonTitle,
    });
  }
}
