import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RegisterPlainStore, RegisterPlainState } from './register--plain.store';

@Injectable({ providedIn: 'root' })
export class RegisterPlainQuery extends QueryEntity<RegisterPlainState> {

  constructor(protected store: RegisterPlainStore) {
    super(store);
  }

}
