import { Component, Injector, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MemberQuery } from 'src/app/business/queries/member.query';
import { MemberService } from 'src/app/business/services/member.service';
import { Member } from 'src/app/business/states/member.store';
import { MemberAddPage } from '../member-add/member-add.page';
import { MemberDetailPage } from '../member-detail/member-detail.page';
@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './member-list.page.html',
  styleUrls: ['./member-list.page.scss'],
})
export class MemberListPage implements OnInit {
  public isAllDisplayDataChecked = false;
  public isOperating = this.memberQuery.selectLoading();
  public isIndeterminate = false;
  public listOfDisplayData: Member[] = [];
  public listOfAllData = this.memberQuery.selectAll();
  public mapOfCheckedId: { [key: string]: boolean } = {};
  public numberOfChecked = 0;

  constructor(
    private modalService: NzModalService,
    private memberService: MemberService,
    private memberQuery: MemberQuery,
    injector: Injector,
    public translate: TranslateService
  ) {}

  /**
   * currentPageDataChange
   *
   * @param {Data[]} $event
   * @memberof BasicListComponent
   */
  public currentPageDataChange($event: any): void {
    this.listOfDisplayData = $event;
    this.refreshStatus();
  }

  /**
   * refreshStatus
   *
   * @memberof BasicListComponent
   */
  public refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter((item) => !item.disabled)
      .every((item) => this.mapOfCheckedId[item.id]);
    this.isIndeterminate =
      this.listOfDisplayData
        .filter((item) => !item.disabled)
        .some((item) => this.mapOfCheckedId[item.id]) &&
      !this.isAllDisplayDataChecked;
    this.numberOfChecked = this.memberQuery.getCount(
      (item) => this.mapOfCheckedId[item.id]
    );
  }

  /**
   * checkAll
   *
   * @param {boolean} value
   * @memberof BasicListComponent
   */
  public checkAll(value: boolean): void {
    this.listOfDisplayData
      .filter((item) => !item.disabled)
      .forEach((item) => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }

  /**
   * deleteData
   *
   * @memberof BasicListComponent
   */
  public deleteData(): void {
    setTimeout(() => {
      const memberes = this.memberQuery.getAll({
        filterBy: (entity) => this.mapOfCheckedId[entity.id],
      });
      const ids: string[] = [];
      memberes.forEach((member) => {
        ids.push(member.id);
      });
      this.memberService.deleteMember(ids.join(','));
    }, 1000);
  }

  /**
   * Add Data
   *
   * @memberof BasicListComponent
   */
  public addData(): void {
    this.modalService.create({
      nzTitle: 'add member',
      nzContent: MemberAddPage,
      nzMaskClosable: false,
      nzCloseIcon: '',
    });
  }

  /**
   * Detail Data
   *
   * @memberof BasicListComponent
   */
  public detailData(member: Member): void {
    this.memberService.setActiveMember(member);
    this.modalService.create({
      nzTitle: 'member detail',
      nzContent: MemberDetailPage,
    });
  }

  /**
   * angular life cycle
   *
   * @memberof BasicListComponent
   */
  public ngOnInit(): void {
    this.memberService.getMemberList();
    this.memberQuery
      .selectCount()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.refreshStatus();
      });
  }
}
