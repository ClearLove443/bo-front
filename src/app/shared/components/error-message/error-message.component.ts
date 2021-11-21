import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BasePage } from 'src/app/core/abstract/base.page';

/**
 * Error Message
 *
 * @export
 * @class ErrorMessage
 * @extends {BasePage}
 */
@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
})
export class ErrorMessageComponent extends BasePage {
  @Input() public blankSpace: any;
  @Input() public closeButton: any;
  @Output() public deleteErrorMsgEvent = new EventEmitter<string>();
  public errorMessageIsShown = true;

  constructor(public injector: Injector, public translate: TranslateService) {
    super(injector);
  }

  /**
   * delete error message
   *
   * @memberof ErrorMessageComponent
   */
  public deleteErrorMsg(): void {
    this.deleteErrorMsgEvent.emit('');
  }
}
