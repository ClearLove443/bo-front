import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppRoutingModule } from '../app-routing.module';
import { IconsProviderModule } from '../icons-provider.module';
import { MeunComponent } from './meun/meun.component';
const routes: Routes = [{ path: '', component: MeunComponent }];
@NgModule({
  // declarations: [MeunComponent],
  imports: [
    CommonModule,
    NzMenuModule,
    NzLayoutModule,
    IconsProviderModule,
    AppRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class SidebarModule {}
