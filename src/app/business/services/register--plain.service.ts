import { Injectable } from '@angular/core';
import { NgEntityService } from '@datorama/akita-ng-entity-service';
import { RegisterPlainStore, RegisterPlainState } from './register--plain.store';

@Injectable({ providedIn: 'root' })
export class RegisterPlainService extends NgEntityService<RegisterPlainState> {

  constructor(protected store: RegisterPlainStore) {
    super(store);
  }

}
