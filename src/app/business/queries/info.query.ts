import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { InfoStore, InfoState } from '../states/info.store';

@Injectable({ providedIn: 'root' })
export class InfoQuery extends Query<InfoState> {
  constructor(protected store: InfoStore) {
    super(store);
  }
}
