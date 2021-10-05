import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterGuardService } from './service/router-guard.service';
import { MeunComponent } from './sidebar/meun/meun.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./session/session.module').then((m) => m.SessionModule),
  },
  // { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  // {
  //   path: 'welcome',
  //   loadChildren: () =>
  //     import('./pages/welcome/welcome.module').then((m) => m.WelcomeModule),
  // },
  {
    path: '',
    component: MeunComponent,
    canActivate: [RouterGuardService],
    children: [
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
      {
        path: 'welcome',
        loadChildren: () =>
          import('./home/welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      // {
      //   path: 'system',
      //   loadChildren: () =>
      //     import('../business/pages/dashboard/dashboard.module').then(
      //       (m) => m.DashboardModule
      //     ),
      // },
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
