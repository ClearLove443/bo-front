import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { G2MiniBarComponent } from './g2-mini-bar.component';

/**
 * G2MiniBarModule
 *
 * @export
 * @class G2MiniBarModule
 */
@NgModule({
  declarations: [G2MiniBarComponent],
  exports: [G2MiniBarComponent],
  imports: [CommonModule, NgZorroAntdModule],
})
export class G2MiniBarModule {}
