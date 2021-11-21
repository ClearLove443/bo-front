import { EntityStore, Store } from '@datorama/akita';
import { EMPTY, Observable } from 'rxjs';
import { ApiValidationError } from '../error-handler/errors';
/**
 * api service methods
 *
 * @export
 * @class ApiBaseService
 */
export class BaseService {
  /**
   * Initialize LoadingState before communicating.
   *
   * @private
   * @param {EntityStore<any, any, any>} store
   * @memberof AddressService
   */
  protected initializeLoadingState(
    store: EntityStore<any, any, any> | Store<any>
  ): void {
    store.setLoading(true);
    store.setError(null);
  }
  /**
   * Handle http error
   *
   * @protected
   * @template T
   * @param {EntityStore<any, any, any>} store
   * @returns {(error: any) => Observable<T>}
   * @memberof BaseService
   */
  protected handleError<T>(
    showDialog?: boolean,
    store?: EntityStore<any, any, any> | Store<any>
  ): (error: any) => Observable<T> {
    if (showDialog === void 0) {
      showDialog = false;
    }
    return (error) => {
      if (store) {
        store.setError(error);
        store.setLoading(false);
      }

      if (error.validationError) {
        if (error.validationError.global && showDialog) {
          let messageArray = error.validationError.global;
          let messageStr = '';
          for (let index = 0; index < messageArray.length; index++) {
            messageStr = messageStr + messageArray[index].message;
            if (index + 1 < messageArray.length) {
              messageStr = messageStr + '<br/>';
            }
          }
          throw new ApiValidationError(
            error.httpError,
            messageStr,
            'Business Error'
          );
        }
        return EMPTY;
      }
      throw error;
    };
  }
  /**
   * Handle http error (Silent Mode)
   *
   * @protected
   * @template T
   * @param {EntityStore<any, any, any>} store
   * @returns {(error: any) => Observable<T>}
   * @memberof BaseService
   */
  protected silentHandleError<T>(
    store: EntityStore<any, any, any> | Store<any>
  ): (error: any) => Observable<T> {
    return (error) => {
      store.setError(error);
      store.setLoading(false);
      return EMPTY;
    };
  }
  /**
   * set queryParams
   *
   * @protected
   * @param {string} key
   * @param {*} value
   * @param {*} queryParams
   * @memberof BaseService
   */
  protected setQueryParam(key: string, value: any, queryParams: any): void {
    if (value !== undefined) {
      if (typeof value === 'string') {
        queryParams = queryParams.set(key, value);
      } else if (Array.isArray(value)) {
        value.forEach(function (v) {
          return (queryParams = queryParams.append(key, v));
        });
      } else {
        queryParams = queryParams.set(key, JSON.stringify(value));
      }
    }
  }
}
