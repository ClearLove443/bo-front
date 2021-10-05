import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Member, MemberState, MemberStore } from '../states/member.store';

@Injectable({ providedIn: 'root' })
export class MemberQuery extends QueryEntity<MemberState, Member> {
  constructor(protected store: MemberStore) {
    super(store);
  }
}
