import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Platform, PlatformCoreStore } from '../states/platform-core.store';

@Injectable({ providedIn: 'root' })
export class PlatformCoreQuery extends Query<Platform> {
  constructor(protected store: PlatformCoreStore) {
    super(store);
  }
}
