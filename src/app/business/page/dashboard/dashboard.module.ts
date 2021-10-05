import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { WelcomeComponent } from './welcome/welcome.component';
const routes: Routes = [{ path: 'home', component: WelcomeComponent }];
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
export class DashBoardModule {}
