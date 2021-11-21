import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { BaseService } from 'src/app/core/abstract/base.service';
import { EnvUtil } from 'src/environments/environment';
import { createMember, Member, MemberStore } from '../states/member.store';

/**
 * Member service
 *
 * @export
 * @class MemberService
 */
@Injectable({
  providedIn: 'root',
})
export class MemberService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private memberStore: MemberStore
  ) {
    super();
  }

  /**
   * subscribe websocket server
   *
   * @memberof MemberService
   */
  public getMemberList(): void {
    this.initializeLoadingState(this.memberStore);
    // this.memberStore.setLoading(true);
    this.httpClient
      .get<Array<Member>>(EnvUtil.env.apiUrl.member + '/list')
      .pipe(catchError(this.handleError(true, this.memberStore)), delay(2000))
      .subscribe((memberList: Array<Member> | any) => {
        this.memberStore.set(memberList);
        this.memberStore.setLoading(false);
      });
  }

  /**
   * set active member
   *
   * @param {Member} member
   * @memberof MemberService
   */
  public setActiveMember(member: Member): void {
    this.memberStore.setActive(member.id);
  }

  /**
   * submit message to server
   *
   * @param {string} message
   * @param {string} userId
   * @param {string} userName
   * @memberof MemberService
   */
  public submitMember(
    name: string,
    bankName: string,
    bankCode: string,
    branchName: string,
    accountNo: string,
    accountType: string
  ): Observable<boolean> {
    const member = createMember({
      name,
      bankName,
      bankCode,
      branchName,
      accountNo,
      accountType,
    });

    return new Observable((observer: Observer<boolean>) => {
      this.initializeLoadingState(this.memberStore);
      // this.memberStore.setLoading(true);
      this.httpClient
        .post(EnvUtil.env.apiUrl.member + '/add', member)
        .pipe(delay(2000))
        .subscribe(
          (_success) => {
            this.getMemberList();
            observer.next(true);
          },
          (error) => {
            this.handleError(true, this.memberStore)(error);
            observer.next(false);
          }
        );
    });
  }

  /**
   * delete member
   *
   * @param {string} id
   * @memberof MemberService
   */
  public deleteMember(id: string): void {
    this.initializeLoadingState(this.memberStore);
    // this.memberStore.setLoading(true);
    this.httpClient
      .delete(EnvUtil.env.apiUrl.member + `/item/${id}`)
      .pipe(catchError(this.handleError(true, this.memberStore)), delay(1000))
      .subscribe(() => {
        this.getMemberList();
      });
  }
}
