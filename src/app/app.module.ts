import { registerLocaleData } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import en from '@angular/common/locales/en';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { akitaDevtools } from '@datorama/akita';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { EnvUtil } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateYamlLoader } from './core/translate/translate-yaml-loader';
import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { WebAppGlobalErrorHandler } from './service/error-handler';
import {
  DEFAULT_HTTP_TIMEOUT,
  WebAppHttpInterceptor,
} from './service/http-interceptor';
import { DashboardLayoutsComponent } from './shared/layout/dahboard/dashboard-layouts.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { ReuseTabComponent } from './shared/layout/reuse-tab/reuse-tab.component';
import { SidebarComponent } from './shared/layout/sidebar/sidebar.component';
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
const LAYOUT_COMPONENT = [
  DashboardLayoutsComponent,
  HeaderComponent,
  SidebarComponent,
  ReuseTabComponent,
  FooterComponent,
];
/**
 * Adds prefixes to TranslateYamlLoader default value
 *
 * @export
 * @param {HttpClient} http
 * @returns {TranslateYamlLoader}
 */
export function TranslateYamlLoaderFactory(
  http: HttpClient
): TranslateYamlLoader {
  return new TranslateYamlLoader(http);
}
@NgModule({
  declarations: [AppComponent, ...LAYOUT_COMPONENT],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateYamlLoaderFactory,
        deps: [HttpClient],
      },
    }),
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
