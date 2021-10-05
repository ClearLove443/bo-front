import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface MemberState {
  key: string;
}

/**
 * Member
 *
 * @export
 * @interface Member
 */
export interface Member {
  id: string;
  name: string | undefined;
  bankName: string | undefined;
  bankCode: string | undefined;
  branchName: string | undefined;
  accountNo: string | undefined;
  accountType: string | undefined;
  disabled: boolean;
}

/**
 * createMember
 *
 * @export
 * @param {Partial<Member>} {
 *   name,
 *   bankName,
 *   bankCode,
 *   branchName,
 *   accountNo,
 *   accountType
 * }
 * @returns
 */
export function createMember({
  name,
  bankName,
  bankCode,
  branchName,
  accountNo,
  accountType,
}: Partial<Member>): Member {
  return {
    id: '',
    name,
    bankName,
    bankCode,
    branchName,
    accountNo,
    accountType,
    disabled: false,
  };
}

/**
 * AddressState
 *
 * @export
 * @interface AddressState
 * @extends {EntityState<Address>}
 */
export interface MemberState extends EntityState<Member> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'member' })
export class MemberStore extends EntityStore<MemberState, Member> {
  constructor() {
    super({});
  }
}
