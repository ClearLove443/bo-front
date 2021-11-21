import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import * as merge from 'deepmerge';
import * as jsyaml from 'js-yaml';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * Define translate loader for multiple files using http.
 *
 * @export
 * @class TranslateYamlLoader
 * @implements {TranslateLoader}
 */
export class TranslateYamlLoader implements TranslateLoader {
  private http;
  private directory;
  private prefixes;
  private suffix;
  /**
   * Creates an instance of TranslateYamlLoader.
   * @param {HttpClient} http HTTP module
   * @param {string} [directory='assets/i18n/'] yaml dir
   * @param {string[]} [prefixes=['label', 'message', 'code']] the directory for language file
   * @param {string} [suffix='.yaml'] the extension of language file
   * @memberof TranslateYamlLoader
   */
  constructor(
    http: HttpClient,
    directory?: string,
    prefixes?: string[],
    suffix?: string
  ) {
    if (directory === void 0) {
      directory = 'assets/i18n/';
    }
    if (prefixes === void 0) {
      prefixes = ['label.', 'message.', 'code.'];
    }
    if (suffix === void 0) {
      suffix = '.yaml';
    }
    this.http = http;
    this.directory = directory;
    this.prefixes = prefixes;
    this.suffix = suffix;
  }
  /**
   * Gets the translations from the server
   *
   * @param {string} lang language
   * @returns {*} translate data (Observable<any>)
   * @memberof TranslateYamlLoader
   */
  public getTranslation(lang: string): Observable<any> {
    const requests = this.prefixes.map((prefix) => {
      const isYaml = this.suffix.includes('yaml');
      const path = this.directory + lang + '/' + prefix + lang + this.suffix;

      return this.http
        .get(path, {
          responseType: 'text',
        })
        .pipe(
          catchError(() => {
            console.error('Could not find translation file:', path);
            return of({});
          }),
          map((res) => {
            if (!res) {
              return {};
            }
            if (isYaml) {
              return jsyaml.safeLoad(res.toString());
            } else {
              return JSON.parse(res.toString());
            }
          })
        );
    });
    return forkJoin(requests).pipe(map((response) => merge.all(response)));
  }
}
