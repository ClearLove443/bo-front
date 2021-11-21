import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NgZorroAntdModule } from 'src/app/ng-zorro-antd.module';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login2/login2.component';
// const routes: Routes = [{ path: '', component: LoginComponent }];
const routes: Routes = [{ path: '', component: Login2Component }];
@NgModule({
  declarations: [LoginComponent, Login2Component],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
    // BrowserAnimationsModule,
  ],
  exports: [LoginComponent, Login2Component],
})
export class SessionModule {}
