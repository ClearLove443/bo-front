import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { G2CardComponent } from './g2-card.component';

/**
 * G2CardModule
 *
 * @export
 * @class G2CardModule
 */
@NgModule({
  declarations: [G2CardComponent],
  exports: [G2CardComponent],
  imports: [CommonModule, NgZorroAntdModule],
})
export class G2CardModule {}
