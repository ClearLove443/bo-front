import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { G2MiniAreaComponent } from './g2-mini-area.component';

/**
 * G2MiniAreaModule
 *
 * @export
 * @class G2MiniAreaModule
 */
@NgModule({
  declarations: [G2MiniAreaComponent],
  exports: [G2MiniAreaComponent],
  imports: [CommonModule, NgZorroAntdModule],
})
export class G2MiniAreaModule {}
