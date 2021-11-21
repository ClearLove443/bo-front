import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PlatformCoreService } from 'src/app/business/services/platform-core.service';

/**
 * HeaderComponent
 *
 * @export
 * @class HeaderComponent
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private platformCoreService: PlatformCoreService,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'ja']);
  }

  /**
   * logout
   *
   * @memberof HeaderComponent
   */
  public logout(): void {
    this.platformCoreService.logout();
    location.href = '/';
  }
}
