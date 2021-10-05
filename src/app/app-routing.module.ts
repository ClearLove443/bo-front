import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterGuardService } from './service/router-guard.service';
import { DashboardLayoutsComponent } from './shared/layout/dahboard/dashboard-layouts.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./business/page/session/session.module').then(
        (m) => m.SessionModule
      ),
  },
  {
    path: '',
    component: DashboardLayoutsComponent,
    canActivate: [RouterGuardService],
    children: [
      { path: '', redirectTo: '/system/home', pathMatch: 'full' },
      {
        path: 'system',
        loadChildren: () =>
          import('./business/page/dashboard/dashboard.module').then(
            (m) => m.DashBoardModule
          ),
      },
      {
        path: 'member',
        loadChildren: () =>
          import('./business/page/member/member.module').then(
            (m) => m.MemberModule
          ),
      },
      // {
      //   path: 'exception',
      //   loadChildren: () =>
      //     import('./pages/exception/exception.module').then(
      //       (m) => m.ExceptionModule
      //     ),
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
