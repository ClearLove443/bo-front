import * as jsyaml from 'js-yaml';
import { IEnvironment } from './environment.model';

/**
 * Environment Util
 *
 * @export
 * @class StorageUtil
 */
export class EnvUtil {
  public static env: IEnvironment;

  /**
   * initializeEnvironment
   *
   * @static
   * @returns {void}
   * @memberof EnvironmentUtil
   */
  public static initializeEnvironment(): void {
    const request = new XMLHttpRequest();
    request.open('GET', './assets/config/environment.yaml', false);
    request.send(null);
    if (request.status !== 200) {
      location.reload();
    }

    const yaml = jsyaml.safeLoadAll(request.responseText);
    EnvUtil.env = yaml ? yaml[0] : yaml;
  }
}
