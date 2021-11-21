import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseComponent } from './base.component';
/**
 * Base page
 *
 * @export
 * @class BasePage
 */
@Component({
  template: '',
})
export class BasePage extends BaseComponent implements OnInit {
  injector!: Injector;
  /**
   * ScreenName for Analytics
   *
   * @memberof BasePage
   */
  screenName!: string | undefined;
  /**
   * Creates an instance of BasePage.
   * @param {Injector} injector
   * @memberof BasePage
   */
  constructor(injector: Injector) {
    super(injector);
    this.injector = injector;
    this.screenName = undefined;
  }
  /**
   * angular life cycle hook
   *
   * @memberof BasePage
   */
  ngOnInit(): void {
    let pageName = this.screenName ? this.screenName : this.className;
    console.log(pageName);
  }
  /**
   * get class name
   *
   * @readonly
   * @type {string}
   * @memberof BasePage
   */
  get className(): string {
    return this.constructor.name;
  }
  /**
   * Set Validation Error to Form
   *
   * @protected
   * @param {FormGroup} form
   * @param {*} error
   * @param {boolean} [givePriorityToGlobalError=false] Ignore field errors if "true" is experiencing global errors.
   * @returns {void}
   * @memberof BasePage
   */
  protected setFormError(
    form: FormGroup,
    error: any,
    givePriorityToGlobalError?: boolean
  ): void {
    if (givePriorityToGlobalError === void 0) {
      givePriorityToGlobalError = false;
    }
    if (!error || !error.validationError) {
      return;
    }
    let validationError = error.validationError;
    let isGlobalError =
      validationError.global && validationError.global.length > 0;
    if (isGlobalError) {
      let messageArray = validationError.global;
      let messageStr = [];
      for (let index = 0; index < messageArray.length; index++) {
        messageStr.push(messageArray[index].message);
      }
      if (form.controls['global']) {
        form.controls['global'].setErrors({ incorrect: messageStr.join('\n') });
      }
    }
    if (
      (!givePriorityToGlobalError && validationError.fields) ||
      (givePriorityToGlobalError && !isGlobalError && validationError.fields)
    ) {
      let messageStr_1: any = {};
      validationError.fields.forEach(
        (fieldErr: { field: string; message: any }) => {
          if (!messageStr_1[fieldErr.field]) {
            messageStr_1[fieldErr.field] = [];
          }
          messageStr_1[fieldErr.field].push(fieldErr.message);
        }
      );
      for (
        let _i = 0, _a = Object.entries(messageStr_1);
        _i < _a.length;
        _i++
      ) {
        let _b = _a[_i],
          key = _b[0],
          value = _b[1];
        if (form.controls[key] && value instanceof Array) {
          form.controls[key].setErrors({
            incorrect: value.join('\n'),
          });
        }
      }
    }
  }
}
