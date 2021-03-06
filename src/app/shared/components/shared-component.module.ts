import { ModuleWithProviders, NgModule } from '@angular/core';
import { ErrorMessageModule } from './error-message/error-message.module';
import { G2CardModule } from './g2-card/g2-card.module';
import { G2MiniAreaModule } from './g2-mini-area/g2-mini-area.module';
import { G2MiniBarModule } from './g2-mini-bar/g2-mini-bar.module';
import { G2MiniProgressModule } from './g2-mini-progress/g2-mini-progress.module';
import { TrendModule } from './trend/trend.module';
import { ValidationMessagesModule } from './validation-messages/validation-messages.module';

const COMPONENTS_CORE = [
  G2CardModule,
  G2MiniAreaModule,
  G2MiniBarModule,
  G2MiniProgressModule,
  TrendModule,
  ErrorMessageModule,
  ValidationMessagesModule,
];

/**
 * SharedComponentModule
 *
 * @export
 * @class SharedComponentModule
 */
@NgModule({
  exports: [...COMPONENTS_CORE],
  imports: [...COMPONENTS_CORE],
})
export class SharedComponentModule {
  /**
   * ModuleWithProviders
   *
   * @static
   * @returns {ModuleWithProviders}
   * @memberof SharedComponentModule
   */
  public static forRoot(): ModuleWithProviders<SharedComponentModule> {
    return {
      ngModule: SharedComponentModule,
      providers: [],
    };
  }
}
