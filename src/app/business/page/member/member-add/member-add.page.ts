import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filterNil } from '@datorama/akita';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MemberQuery } from 'src/app/business/queries/member.query';
import { MemberService } from 'src/app/business/services/member.service';
@UntilDestroy()
@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.page.html',
  styleUrls: ['./member-add.page.scss'],
  animations: [
    trigger('accordion', [
      transition(':enter', [
        style({ height: '0', overflow: 'hidden' }),
        animate('100ms', style({ height: '*' })),
      ]),
      transition(':leave', [
        style({ height: '*', overflow: 'hidden' }),
        animate('100ms', style({ height: '0' })),
      ]),
    ]),
  ],
})
export class MemberAddPage implements OnInit {
  public screenName = 'Login';
  public memberForm!: FormGroup;
  public accountTypes!: string;
  public isOperating = this.memberQuery.selectLoading();
  constructor(
    public injector: Injector,
    private modalCtrl: NzModalRef,
    private memberService: MemberService,
    private memberQuery: MemberQuery,

    private builder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.memberForm = this.builder.group({
      global: [null],
      name: [null, Validators.required],
      bankName: [null, Validators.required],
      bankCode: [null, Validators.required],
      branchName: [null, Validators.required],
      accountNo: [null, Validators.required],
      accountType: [null, Validators.required],
    });

    // for global errors
    this.memberForm.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.memberForm.controls['global'].setErrors(null);
    });
  }

  /**
   * add member
   *
   * @memberof MemberAddPage
   */
  public addMember(): void {
    this.memberService
      .submitMember(
        this.memberForm.get('name')!.value,
        this.memberForm.get('bankName')!.value,
        this.memberForm.get('bankCode')!.value,
        this.memberForm.get('branchName')!.value,
        this.memberForm.get('accountNo')!.value,
        this.memberForm.get('accountType')!.value
      )
      .pipe(untilDestroyed(this), filterNil)
      .subscribe((result) => {
        if (result) {
          this.dismiss();
        }
      });
  }

  /**
   * dismiss modal
   *
   * @memberof AddressAddPage
   */
  public dismiss(): void {
    this.modalCtrl.close();
  }
  public flat(
    obj: Object,
    key = '',
    res: { [x: string]: unknown } = {},
    isArray = false
  ) {
    for (let [k, v] of Object.entries(obj)) {
      if (Array.isArray(v)) {
        let tmp = isArray ? key + '[' + k + ']' : key + k;
        this.flat(v, tmp, res, true);
      } else if (typeof v === 'object') {
        let tmp = isArray ? key + '[' + k + '].' : key + k + '.';
        this.flat(v, tmp, res);
      } else {
        let tmp = isArray ? key + '[' + k + ']' : key + k;
        res[tmp] = v;
      }
    }
    return res;
  }
}
