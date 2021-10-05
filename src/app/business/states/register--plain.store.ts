import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { RegisterPlain } from './register--plain.model';

export interface RegisterPlainState extends EntityState<RegisterPlain> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'register--plain' })
export class RegisterPlainStore extends EntityStore<RegisterPlainState> {

  constructor() {
    super();
  }

}
