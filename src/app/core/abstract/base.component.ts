import { ChangeDetectorRef, Injector } from '@angular/core';

/**
 * Base component
 *
 * @export
 * @class BaseComponent
 */
export class BaseComponent {
  injector!: Injector;
  /**
   * Change detector ref
   *
   * @type {ChangeDetectorRef}
   * @memberof BaseComponent
   */
  protected cd!: ChangeDetectorRef;
  /**
   * Error message
   *
   * @type {string}
   * @memberof BaseComponent
   */
  errorMessage!: string;
  /**
   * Creates an instance of BaseComponent.
   * @param {Injector} injector
   * @memberof BaseComponent
   */
  constructor(injector: Injector) {
    this.injector = injector;
    this.cd = injector.get(ChangeDetectorRef);
  }
  /**
   * get track item no
   *
   * @param {*} index
   * @returns
   * @memberof BaseComponent
   */
  trackItem(index: number): number {
    return index;
  }
}
