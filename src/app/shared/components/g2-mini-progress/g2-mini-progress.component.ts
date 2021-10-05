import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
} from '@angular/core';

/**
 * G2MiniProgressComponent
 *
 * @export
 * @class G2MiniProgressComponent
 * @implements {OnChanges}
 */
@Component({
  selector: 'g2-mini-progress',
  templateUrl: './g2-mini-progress.component.html',
  styleUrls: ['./g2-mini-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class G2MiniProgressComponent implements OnChanges {
  @Input() public color = '#1890FF';
  @Input()
  public target: number | string | undefined;
  @Input()
  public percent: number | string | undefined;
  @Input()
  public strokeWidth!: number | string;
  @Input() @HostBinding('class') public cls = 'g2-mini-progress';
  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * fixNum
   *
   * @private
   * @param {number} value
   * @returns
   * @memberof G2MiniProgressComponent
   */
  private fixNum(value: number | string | undefined): number {
    return Math.min(Math.max(Number(value), 0), 100);
  }

  /**
   * angular lif cycle
   *
   * @memberof G2MiniProgressComponent
   */
  public ngOnChanges(): void {
    this.target = this.fixNum(this.target);
    this.percent = this.fixNum(this.percent);
    this.cdr.detectChanges();
  }
}
