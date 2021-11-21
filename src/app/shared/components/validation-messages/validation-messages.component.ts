import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

/**
 * Defines validation error message.
 */
export declare type ValidationErrorMessage = string | ((item: any) => string);

/**
 * Defines validation error messages map.
 * @export
 * @interface ValidationErrorMessageMap
 */
export interface ValidationErrorMessageMap {
  [key: string]: ValidationErrorMessage;
}

const FIELD_PLACEHOLDER = '@@Field';

/**
 * display error messages or success message
 *
 * @export
 * @class ValidationMessagesComponent
 */
@Component({
  selector: 'validation-messages',
  templateUrl: './validation-messages.html',
  styleUrls: ['./validation-messages.scss'],
})
export class ValidationMessagesComponent {
  @Input() public blankSpace!: boolean;
  @Input() public control!: AbstractControl;
  @Input() public success!: string;
  @Input() public fieldName!: string;

  /**
   * Error dictionaries.
   * @example
   * {
   *   required: '本項目を入力してください',
   *   message: ({ error }) => `エラーが発生しました: ${error}`
   * }
   *
   * @memberof ValidationMessagesComponent
   */
  @Input() public error!: ValidationErrorMessageMap;
  @Input() public showErrors?: number;

  constructor(public translate: TranslateService) {}

  private defaultErrors: ValidationErrorMessageMap = {
    required: this.translate.instant('ValidMessages.Required'),
    maxlength: ({ requiredLength: value }) =>
      this.translate.instant('ValidMessages.MaxLength', { value }),
    minlength: ({ requiredLength: value }) =>
      this.translate.instant('ValidMessages.MinLength', { value }),
    max: ({ max: value }) =>
      this.translate.instant('ValidMessages.Max', { value }),
    min: ({ min: value }) =>
      this.translate.instant('ValidMessages.Min', { value }),
    equalLength: ({ length: value }) =>
      this.translate.instant('ValidMessages.EqualLength', { value }),
    requiredNumber: this.translate.instant('ValidMessages.HalfWidthNumeral'),
    fullWidth: this.translate.instant('ValidMessages.FullWidth'),
    fullWidthAlphabetsAndNumbers: this.translate.instant(
      'ValidMessages.FullWidthAlphanumeric'
    ),
    fullWidthKana: this.translate.instant('ValidMessages.FullWidthKana'),
    fullWidthAlphabets: this.translate.instant(
      'ValidMessages.FullWidthAlphabet'
    ),
    fullWidthNumbers: this.translate.instant('ValidMessages.FullWidthNumeral'),
    halfWidthAlphabetsAndNumbers: this.translate.instant(
      'ValidMessages.HalfWidthAlphanumeric'
    ),
    halfWidthAlphabets: this.translate.instant(
      'ValidMessages.HalfWidthAlphabet'
    ),
    halfWidthKana: this.translate.instant('ValidMessages.HalfWidthKana'),
    halfwidth: this.translate.instant('ValidMessages.HalfWidthNumeral'),
    date: this.translate.instant('ValidMessages.Date'),
    incorrect: (message) => this.replaceFieldName(message),
    error: this.translate.instant('ValidMessages.DefaultMessage'),
  };

  get errorMessages(): string[] {
    if (!this.control) {
      return ['Target control is not set.'];
    }

    if (
      this.control.valid ||
      (this.control.untouched && this.control.pristine)
    ) {
      return [];
    }

    const messages: string[] = [];
    let joinMessage = '';
    const errorKeys = Object.keys(this.control.errors!);
    const errorCount = this.showErrors || errorKeys.length;
    for (const propertyName of errorKeys.slice(0, errorCount)) {
      // if multiple validation, combine messages.
      joinMessage += this.getErrorMessage(
        propertyName,
        this.control.errors![propertyName]
      );
    }
    messages.push(joinMessage);
    return messages;
  }

  /**
   * get successMessage
   *
   * @returns {string | null}
   * @memberof ValidationMessagesComponent
   */
  get successMessage(): string | null {
    return this.control && this.control.valid ? this.success : null;
  }

  /**
   * get errorMessage
   *
   * @returns {string}
   * @memberof ValidationMessagesComponent
   */
  public getErrorMessage(validatorName: string, validatorValue: any): string {
    const errors = { ...this.defaultErrors, ...this.error };
    const message = errors[validatorName];
    if (!message) {
      return `Please add a message for ${validatorName}.`;
    }
    if (typeof message === 'string') {
      return message;
    } else {
      return message(validatorValue);
    }
  }

  /**
   * replace @@Field to field name
   *
   * @param {string} message
   * @returns {string}
   * @memberof ValidationMessagesComponent
   */
  private replaceFieldName(message: string): string {
    if (!this.fieldName) {
      return message;
    }
    const translateFieldName = this.translate.instant(this.fieldName);
    const fieldName = translateFieldName ? translateFieldName : this.fieldName;

    return message.replace(FIELD_PLACEHOLDER, fieldName);
  }
}
