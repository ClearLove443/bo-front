import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationMessagesComponent } from './validation-messages.component';

/**
 * Validation messages module.
 *
 * @export
 * @class ValidationMessagesModule
 */
@NgModule({
  imports: [CommonModule, FormsModule, TranslateModule, ReactiveFormsModule],
  declarations: [ValidationMessagesComponent],
  exports: [ValidationMessagesComponent],
})
export class ValidationMessagesModule {}
