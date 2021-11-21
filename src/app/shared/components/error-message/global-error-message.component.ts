import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';

/**
 * Global error message
 *
 * @export
 * @class GlobalErrorMessageComponent
 * @extends {BasePage}
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@UntilDestroy()
@Component({
  selector: 'global-error-message',
  templateUrl: './global-error-message.component.html',
})
export class GlobalErrorMessageComponent implements OnInit {
  @Input() public form!: FormGroup;

  constructor(public translate: TranslateService) {}

  public get global(): AbstractControl | null {
    return this.form && this.form.get('global');
  }

  public get errorMessage(): any {
    if (!this.global) {
      return 'global field is not defined.';
    }
    return this.global.errors!.incorrect;
  }

  /**
   * angular lifecycle
   *
   * @memberof GlobalErrorMessageComponent
   */
  public ngOnInit(): void {
    // disable global errors
    this.form.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      if (this.global) {
        this.global.setErrors(null);
      }
    });
  }
}
