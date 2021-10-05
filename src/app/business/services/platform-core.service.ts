import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EnvUtil } from 'src/environments/environment';
import { MenuItem, PlatformCoreStore } from '../states/platform-core.store';
/**
 * MenuItem
 *
 * @export
 * @class MenuItem
 */

@Injectable({ providedIn: 'root' })
export class PlatformCoreService {
  constructor(
    private platformCoreStore: PlatformCoreStore,
    private http: HttpClient
  ) {}

  /**
   * getDesktop
   *
   * @returns {{
   *     title: string;
   *     module: string;
   *     power: string;
   *     isSelect: boolean;
   *   }}
   * @memberof PlatformCoreService
   */
  public getDesktop(): {
    title: string;
    module: string;
    power: string;
    isSelect: boolean;
  } {
    return {
      title: 'Home',
      module: '/system/home',
      power: '',
      isSelect: true,
    };
  }

  /**
   * 获取菜单
   */
  public getMenuResource(): void {
    const serviceRootUrl = EnvUtil.env.apiUrl.auth;

    this.http
      .get<{ data: Array<MenuItem> }>(serviceRootUrl + '/meun')
      .pipe(delay(2000))
      .subscribe((result) => {
        this.platformCoreStore.update({
          menuItem: result.data,
        });
      });
  }

  /**
   * getNotifyMessage
   *
   * @memberof PlatformCoreService
   */
  public getNotifyMessage(): void {}

  /**
   * login
   *
   * @param {Function} callback
   * @param {string} userName
   * @param {string} password
   * @param {string} verifyCode
   * @memberof PlatformCoreService
   */
  public login(
    _userName: string,
    password: string,
    _verifyCode: string | null
  ): Observable<boolean> {
    const serviceRootUrl = EnvUtil.env.apiUrl.auth;
    return new Observable((observer: Observer<boolean>) => {
      this.http
        .post<{ token: string }>(serviceRootUrl + '/login', {
          password: password,
        })
        .subscribe((res) => {
          const token = res.token;
          localStorage.setItem('token', token);
          observer.next(true);
        });
    });
  }

  /**
   * logout
   *
   * @memberof PlatformCoreService
   */
  public logout(): void {
    localStorage.removeItem('token');
  }

  /**
   * getUserInfo
   *
   * @memberof PlatformCoreService
   */
  public getUserInfo(): void {}
}
