import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnvUtil } from 'src/environments/environment';
import { BaseService } from '../abstract/base.service';
import { Auth, AuthCredential, AuthStore, createAuth } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(private authStore: AuthStore, private http: HttpClient) {
    super();
  }
  /**
   * login
   *
   * @param {AuthCredential} credos
   * @returns
   * @memberof AuthService
   */
  login(credos: AuthCredential): Subscription {
    this.initializeLoadingState(this.authStore);
    return (
      this.http
        .post<Auth>(EnvUtil.env.apiUrl.auth + '/login', credos)
        .pipe(
          // catchError((error) => {
          //   console.error('ServiceCatchError', error);
          //   throw error;
          // })
          catchError(this.handleError(true, this.authStore))
        )
        // .pipe(
        //   map((response) => {
        //     return response;
        //   })
        // )
        .subscribe(
          (auth: any) => {
            this.authStore.update({
              auth: createAuth(auth),
            });
          }
          // ,(error) => {
          //   console.error('ServiceSubscribe', error);
          //   // observer.next(false);
          //   throw error;
          // }
        )
    );
  }
  /**
   * logout
   *
   * @memberof AuthService
   */
  logout(): void {
    this.authStore.reset();
  }
}
