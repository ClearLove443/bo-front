import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface InfoState {
   key: string;
}

export function createInitialState(): InfoState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'info' })
export class InfoStore extends Store<InfoState> {

  constructor() {
    super(createInitialState());
  }

}
