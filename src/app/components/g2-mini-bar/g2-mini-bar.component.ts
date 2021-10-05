import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';

declare let G2: any;

/**
 * G2MiniBarData
 *
 * @export
 * @interface G2MiniBarData
 */
export interface G2MiniBarData {
  x: any;
  y: any;
  [key: string]: any;
}

/**
 * G2MiniBarComponent
 *
 * @export
 * @class G2MiniBarComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'g2-mini-bar',
  template: ``,
  styleUrls: ['./g2-mini-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class G2MiniBarComponent implements OnInit, OnChanges, OnDestroy {
  private chart: any;

  @Input() public delay = 0;
  @Input() public color = '#1890FF';
  @Input() @HostBinding('style.height.px') public height: string | number = 56;
  @Input() public barWidth: string | number = 5;
  @Input() public padding: Array<string | number> = [8, 8, 8, 8];
  @Input() public data: G2MiniBarData[] | undefined;
  @Input() public yTooltipSuffix = '';
  @Input() public tooltipType: 'mini' | 'default' = 'default';
  @Input() public axis: string | boolean | null | undefined;
  @Input() public legend = false;

  /**
   *Creates an instance of G2MiniBarComponent.
   * @param {ElementRef} el
   * @param {NgZone} ngZone
   * @param {ChangeDetectorRef} cdr
   * @memberof G2MiniBarComponent
   */
  constructor(private el: ElementRef, private ngZone: NgZone) {}

  /**
   * G2 install
   *
   * @private
   * @memberof G2MiniBarComponent
   */
  private install(): void {
    const { el, height, padding, yTooltipSuffix, tooltipType, axis, legend } =
      this;
    const chart = (this.chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: true,
      height,
      padding,
    }));
    chart.source([], {
      x: {
        type: 'cat',
      },
      y: {
        min: 0,
      },
    });
    chart.legend(legend);
    chart.axis(axis);
    chart.tooltip({
      type: tooltipType === 'mini' ? 'mini' : null,
      showTitle: false,
      hideMarkders: false,
      crosshairs: false,
      'g2-tooltip': { padding: 4 },
      'g2-tooltip-list-item': { margin: `0px 4px` },
    });
    chart
      .interval()
      .position('x*y')
      .tooltip('x*y', (x: any, y: string) => ({
        name: x,
        value: y + yTooltipSuffix,
      }));

    chart.render();
    this.attachChart();
  }

  /**
   * attachChart
   *
   * @private
   * @returns {void}
   * @memberof G2MiniBarComponent
   */
  private attachChart(): void {
    const { chart, height, padding, data, color, barWidth } = this;
    if (!chart || !data || data.length <= 0) {
      return;
    }
    chart.get('geoms')[0].size(barWidth).color(color);
    chart.set('height', height);
    chart.set('padding', padding);
    chart.changeData(data);
  }

  /**
   * angular life cycle
   *
   * @memberof G2MiniBarComponent
   */
  public ngOnInit(): void {
    this.ngZone.runOutsideAngular(() =>
      setTimeout(() => this.install(), this.delay)
    );
  }

  /**
   * angular life cycle
   *
   * @memberof G2MiniBarComponent
   */
  public ngOnChanges(): void {
    this.ngZone.runOutsideAngular(() => this.attachChart());
  }

  /**
   * angular life cycle
   *
   * @memberof G2MiniBarComponent
   */
  public ngOnDestroy(): void {
    if (this.chart) {
      this.ngZone.runOutsideAngular(() => this.chart.destroy());
    }
  }
}
