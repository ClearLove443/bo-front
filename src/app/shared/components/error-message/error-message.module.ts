import { NzIconModule } from 'ng-zorro-antd/icon';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ErrorMessageComponent } from './error-message.component';
import { GlobalErrorMessageComponent } from './global-error-message.component';

/**
 * ErrorMessageModule
 *
 * @export
 * @class ErrorMessageModule
 */
@NgModule({
  declarations: [ErrorMessageComponent, GlobalErrorMessageComponent],
  exports: [ErrorMessageComponent, GlobalErrorMessageComponent],
  imports: [CommonModule, NzIconModule]
})
export class ErrorMessageModule {}
