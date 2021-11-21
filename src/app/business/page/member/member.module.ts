import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { MapComponent } from './map/map.component';
import { MemberAddPage } from './member-add/member-add.page';
import { MemberDetailPage } from './member-detail/member-detail.page';
import { MemberListPage } from './member-list/member-list.page';
import { SearchComponent } from './search/search.component';
const routes: Routes = [
  {
    path: 'list',
    component: MemberListPage,
    data: { title: 'list', reuse: true },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { title: 'search', reuse: true },
  },
  {
    path: 'map',
    component: MapComponent,
    data: { title: 'map', reuse: true },
  },
];

@NgModule({
  declarations: [MapComponent, MemberListPage, MemberAddPage, MemberDetailPage],
  imports: [
    NzModalModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    CommonModule,
    NgZorroAntdModule,
    GoogleMapsModule,
    RouterModule.forChild(routes),
    SharedComponentModule,
    TranslateModule,
  ],
})
export class MemberModule {}
