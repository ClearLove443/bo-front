import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Observable } from 'rxjs';
import { AuthState, AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  /**
   * Observable logged in state
   *
   * @memberof AuthQuery
   */
  isLoggedIn$!: Observable<boolean>;
  constructor(protected store: AuthStore) {
    super(store);
    this.isLoggedIn$ = this.select((auth) => {
      return auth.auth && !!auth.auth.accessToken;
    });
  }

  /**
   * Pick token
   *
   * @memberof AuthQuery
   */
  getAuthorizationToken(): string | undefined {
    return this.getValue().auth ? this.getValue().auth.accessToken : undefined;
  }
  /**
   * Pick token
   *
   * @memberof AuthQuery
   */
  getRefreshToken(): string | undefined {
    return this.getValue().auth ? this.getValue().auth.refreshToken : undefined;
  }
  /**
   * Pick user ID
   *
   * @memberof AuthQuery
   */
  getUserId(): string | undefined {
    return this.getValue().auth ? this.getValue().auth.uuid : undefined;
  }
  /**
   * is login
   *
   * @memberof AuthQuery
   */
  isLogin(): boolean {
    return !!this.getValue().auth && !!this.getValue().auth.accessToken;
  }
}
