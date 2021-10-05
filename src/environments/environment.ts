import * as jsyaml from 'js-yaml';

/**
 * Environment Util
 *
 * @export
 * @class StorageUtil
 */
export class EnvUtil {
  public static env: any;

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
    const yaml = jsyaml.loadAll(request.responseText);
    EnvUtil.env = yaml ? yaml[0] : yaml;
  }
}
