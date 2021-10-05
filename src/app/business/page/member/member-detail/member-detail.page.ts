import { Component, Injector, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MemberQuery } from 'src/app/business/queries/member.query';
import { Member } from 'src/app/business/states/member.store';

/**
 * MemberAddPage
 *
 * @export
 * @class MemberAddPage
 * @extends {BasePage}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.page.html',
  styleUrls: ['./member-detail.page.scss'],
})
export class MemberDetailPage implements OnInit {
  public screenName = 'MemberDetail';
  public member: Member | undefined;

  /**
   * Creates an instance of MemberAddPage.
   * @param {Injector} injector
   * @param {ModalController} modalCtrl
   * @param {FormBuilder} builder
   * @memberof MemberAddPage
   */
  constructor(
    public injector: Injector,
    private modalCtrl: NzModalRef,
    private memberQuery: MemberQuery
  ) {}

  /**
   * angular lifecycle
   *
   * @memberof MemberAddPage
   */
  public ngOnInit(): void {
    const member = this.memberQuery.getActive();
    if (member instanceof Array) {
      this.member = member[0];
    } else {
      this.member = member;
    }
  }

  /**
   * dismiss modal
   *
   * @memberof MemberAddPage
   */
  public dismiss(): void {
    this.modalCtrl.close();
  }
}
