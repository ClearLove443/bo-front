import { HttpErrorResponse } from '@angular/common/http';
import { CustomError } from 'ts-custom-error';
/**
 * Default validation error for ACTS
 *
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
  error: string;
  fields: Array<ValidFieldsError>;
  global: Array<ValidGlobalError>;
}
/**
 * Single field error
 *
 * @export
 * @interface ValidFieldsError
 */
export interface ValidFieldsError {
  field: string;
  message: string;
}
/**
 * Multiple field error
 *
 * @export
 * @interface ValidGlobalError
 */
export interface ValidGlobalError {
  message: 'string';
}
/**
 * Application Default Error
 *
 * @export
 * @class ApplicationError
 * @implements {Error}
 */
export class ApplicationError extends CustomError {
  /**
   * for Error dialog message
   *
   * @type {string}
   * @memberof ApplicationError
   */
  businessMessage!: string | undefined;
  /**
   * for Error dialog title
   *
   * @type {string}
   * @memberof ApplicationError
   */
  businessMessageTitle!: string | undefined;
  /**
   * error code
   *
   * @type {number}
   * @memberof ApplicationError
   */
  code!: number;
  /**
   * error handler after callback
   *
   * @private
   * @memberof ApplicationError
   */
  errorHandlerAfterCallback!: (() => Promise<void>) | undefined;
  /**
   * When the dialog is displayed, skip showing the dialog in duplicate.
   *
   * @type {false}
   * @memberof ApplicationError
   */
  skipWhileStackDialog: boolean | undefined = false;
  /**
   *Creates an instance of ApplicationError.
   * @param {string} [message]
   * @param {string} [businessMessage]
   * @param {string} [businessMessageTitle]
   * @param {() => Promise<void>} [errorHandlerAfterCallback]
   * @memberof ApplicationError
   */
  constructor(
    message?: string,
    businessMessage?: string,
    businessMessageTitle?: string,
    errorHandlerAfterCallback?: () => Promise<void>,
    skipWhileStackDialog?: boolean
  ) {
    super(message);
    this.code = 0;
    this.businessMessage = businessMessage;
    this.businessMessageTitle = businessMessageTitle;
    this.errorHandlerAfterCallback = errorHandlerAfterCallback;
    this.skipWhileStackDialog = skipWhileStackDialog;
  }
  /**
   * Returns a string that represents the current object.
   *
   * @returns A string that represents the current object.
   * @memberof ApplicationError
   */
  toString(): string {
    return this.name + ': ' + this.message;
  }
}
/**
 * Application Network Error
 *
 * @export
 * @class NetworkError
 * @extends {ApplicationError}
 */
export class NetworkError extends ApplicationError {
  httpError!: HttpErrorResponse;
  /**
   *Creates an instance of NetworkError.
   * @param {HttpErrorResponse} httpError
   * @param {string} [businessMessage]
   * @param {string} [businessMessageTitle]
   * @param {() => Promise<void>} [errorHandlerAfterCallback]
   * @memberof NetworkError
   */
  constructor(
    httpError: HttpErrorResponse,
    businessMessage?: string,
    businessMessageTitle?: string,
    errorHandlerAfterCallback?: () => Promise<void>,
    skipWhileStackDialog?: boolean
  ) {
    super(
      httpError.message,
      businessMessage,
      businessMessageTitle,
      errorHandlerAfterCallback,
      skipWhileStackDialog
    );
    this.httpError = httpError;
    this.code = httpError.status;
  }
}
/**
 * Maintenance error
 *
 * @export
 * @class MaintenanceError
 * @extends {ApplicationError}
 */
export class MaintenanceError extends NetworkError {}
/**
 * Application Authentication Error
 *
 * @export
 * @class AuthenticationError
 * @extends {ApplicationError}
 */
export class AuthenticationError extends NetworkError {}
/**
 * Application API Error
 *
 * @export
 * @class NetworkError
 * @extends {ApplicationError}
 */
export class ApiValidationError extends ApplicationError {
  httpError!: HttpErrorResponse;
  validationError!: ValidationError;
  /**
   *Creates an instance of ApiValidationError.
   * @param {HttpErrorResponse} httpError
   * @param {string} [businessMessage]
   * @param {string} [businessMessageTitle]
   * @param {() => Promise<void>} [errorHandlerAfterCallback]
   * @memberof ApiValidationError
   */
  constructor(
    httpError: HttpErrorResponse,
    businessMessage?: string,
    businessMessageTitle?: string,
    errorHandlerAfterCallback?: () => Promise<void>,
    skipWhileStackDialog?: boolean
  ) {
    super(
      httpError.message,
      businessMessage,
      businessMessageTitle,
      errorHandlerAfterCallback,
      skipWhileStackDialog
    );
    this.httpError = httpError;
    // for ApiValidationError
    this.validationError = httpError.error;
    this.code = httpError.status;
  }
}
/**
 * Application API Error
 *
 * @export
 * @class NetworkError
 * @extends {ApplicationError}
 */
export class ApiSystemError extends NetworkError {}
