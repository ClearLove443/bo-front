/**
 * Environment Interface
 *
 * @export
 * @interface Environment
 */
export interface IEnvironment {
  production: boolean;
  host: string;
  apiUrl: {
    auth: string;
    address: string;
    member: string;
    charts: string;
    chat: string;
  };
  useMock: boolean;
  logLevel: {
    console: string;
    server: string;
    firebase: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
  };
}
