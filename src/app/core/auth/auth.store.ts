import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';

/**
 * AuthCredential
 *
 * @export
 * @interface AuthCredential
 */
export interface AuthCredential {
  userId: string;
  password: string;
}
/**
 * Auth
 *
 * @export
 * @interface Auth
 */
export interface Auth {
  uuid: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

/**
 * AuthState
 *
 * @export
 * @interface AuthState
 * @extends {EntityState<Auth>}
 */
export interface AuthState extends EntityState<Auth> {
  auth: Auth;
}

/**
 * Create Auth state
 *
 * @export
 * @param {Partial<Auth>} {
 *   uuid = '',
 *   firstName = '',
 *   lastName = '',
 *   accessToken = '',
 *   refreshToken = ''
 * }
 * @returns
 */
export function createAuth(auth: Auth): Auth {
  return {
    uuid: auth.uuid,
    firstName: auth.firstName,
    lastName: auth.lastName,
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
  };
}
/**
 * AuthStore
 *
 * @export
 * @class AuthStore
 * @extends {EntityStore<AuthState, Auth>}
 */
// @Injectable({ providedIn: 'root' })
// @StoreConfig({ name: 'auth' })
// export class AuthStore extends Store<AuthState> {
//   constructor() {
//     super({});
//   }
// }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
  constructor() {
    super({});
  }
}
