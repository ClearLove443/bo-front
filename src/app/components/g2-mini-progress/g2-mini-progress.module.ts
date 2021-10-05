import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { G2MiniProgressComponent } from './g2-mini-progress.component';

/**
 * G2MiniProgressModule
 *
 * @export
 * @class G2MiniProgressModule
 */
@NgModule({
  declarations: [G2MiniProgressComponent],
  exports: [G2MiniProgressComponent],
  imports: [CommonModule, NgZorroAntdModule],
})
export class G2MiniProgressModule {}
