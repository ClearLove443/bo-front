import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface SearchState {
   key: string;
}

export function createInitialState(): SearchState {
  return {
    key: ''
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'search' })
export class SearchStore extends Store<SearchState> {

  constructor() {
    super(createInitialState());
  }

}
