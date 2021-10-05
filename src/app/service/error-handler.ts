import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

/**
 * Core mobile exception handler
 *
 * @export
 * @class WebAppGlobalErrorHandler
 * @implements {ErrorHandler}
 */
@Injectable()
export class WebAppGlobalErrorHandler implements ErrorHandler {
  /**
   * Creates an instance of GlobalErrorHandler.
   *
   * @param {Injector} injector Injector
   * @memberof WebAppGlobalErrorHandler
   */
  constructor(public injector: Injector, private modalService: NzModalService) {
    this.injector = injector;
  }
  /**
   * Exception handler
   *
   * @param {*} error error object
   * @memberof GlobalErrorHandler
   */
  handleError(error: any): void {
    alert('222' + JSON.stringify(error));
    // var loggerService = this.injector.get(LoggerService);
    // var translate = this.injector.get(TranslateService);
    // // Promise rejection
    // if (error.promise && error.rejection && error.rejection instanceof Error) {
    //   error = error.rejection;
    // }
    // // Create logger message
    // var message = error.message ? error.message : error.toString();
    // var businessMessage = null;
    // var businessMessageTitle = null;
    // console.error(error);
    // // Override dialog messages
    // if (error.businessMessage) {
    //   businessMessage = error.businessMessage;
    //   businessMessageTitle = error.businessMessageTitle;
    // }
    // // NetworkError
    // if (error.name && error.name === 'NetworkError' && !businessMessage) {
    //   businessMessage = translate.instant('SystemMessages.SystemErrorNetwork');
    // }
    // // NetworkError (API Not Found)
    // if (error.name && error.name === 'HttpErrorResponse' && !businessMessage) {
    //   businessMessage = translate.instant('SystemMessages.SystemErrorNetwork');
    // }
    // // ApiSystemError
    // if (error.name && error.name === 'ApiSystemError' && !businessMessage) {
    //   businessMessage = translate.instant('SystemMessages.SystemErrorApi');
    // }
    // // AuthenticationError
    // if (error.name && error.name === 'AuthenticationError') {
    //   if (!businessMessage) {
    //     businessMessage = translate.instant('SystemMessages.SystemErrorAuth');
    //   }
    //   var authService = this.injector.get(AuthService);
    //   authService.logout();
    // }
    // // Maintenance
    // if (error.name && error.name === 'MaintenanceError' && !businessMessage) {
    //   businessMessage = translate.instant(
    //     'SystemMessages.SystemErrorMaintenance'
    //   );
    // }
    // loggerService.systemError({
    //   message: (businessMessage ? businessMessage : '') + message,
    //   error: error instanceof HttpErrorResponse ? null : error,
    // });
    // // Other system error
    // if (!businessMessage) {
    //   businessMessage = translate.instant('SystemMessages.SystemErrorFatal');
    // }
    // this.showSystemErrorDialog(
    //   businessMessageTitle
    //     ? businessMessageTitle
    //     : translate.instant('SystemMessages.SystemErrorTitle'),
    //   businessMessage ? businessMessage : message,
    //   translate.instant('Button.CLOSE')
    // );
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
    this.modalService.error({
      nzTitle: title,
      nzContent: message,
      nzOkText: okButtonTitle,
    });
  }
}
