import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'register', reuse: true },
  },
  {
    path: 'info',
    component: InfoComponent,
    data: { title: 'info', reuse: true },
  },
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'list', reuse: true },
  },
  {
    path: 'search',
    component: SearchComponent,
    data: { title: 'search', reuse: true },
  },
];

@NgModule({
  declarations: [RegisterComponent, InfoComponent, SearchComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MemberModule {}
