import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { TrendComponent } from './trend.component';

/**
 * TrendModule
 *
 * @export
 * @class TrendModule
 */
@NgModule({
  declarations: [TrendComponent],
  exports: [TrendComponent],
  imports: [CommonModule, NgZorroAntdModule],
})
export class TrendModule {}
