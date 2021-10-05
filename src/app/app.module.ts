import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { akitaDevtools } from '@datorama/akita';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { EnvUtil } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { WebAppGlobalErrorHandler } from './service/error-handler';
import {
  DEFAULT_HTTP_TIMEOUT,
  WebAppHttpInterceptor,
} from './service/http-interceptor';
import { MeunComponent } from './sidebar/meun/meun.component';
EnvUtil.initializeEnvironment();
console.log(EnvUtil.env);

if (!EnvUtil.env.production) {
  akitaDevtools();
}
registerLocaleData(en);
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(
  (key) => antDesignIcons[key]
);

const LAYOUT_COMPONENT = [MeunComponent];

@NgModule({
  declarations: [AppComponent, ...LAYOUT_COMPONENT],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebAppHttpInterceptor,
      multi: true,
    },
    { provide: DEFAULT_HTTP_TIMEOUT, useValue: 30000 },
    {
      provide: ErrorHandler,
      useClass: WebAppGlobalErrorHandler,
    },

    { provide: 'GOOGLE_TAG_MANAGER_ID', useValue: 'GTM-MMMCD42' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
