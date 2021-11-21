import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public languages = ['de', 'en', 'es', 'fr', 'it', 'nl'];

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('ja');
    this.translate.use('ja');
  }
}
