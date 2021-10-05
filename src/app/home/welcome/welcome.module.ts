import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponentModule } from 'src/app/components/shared-component.module';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { WelcomeComponent } from './welcome.component';
const routes: Routes = [{ path: '', component: WelcomeComponent }];
@NgModule({
  imports: [
    NgZorroAntdModule,
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(routes),
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
