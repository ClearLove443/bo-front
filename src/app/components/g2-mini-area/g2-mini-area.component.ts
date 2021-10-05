import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnInit,
} from '@angular/core';

declare let G2: any;

/**
 * G2MiniAreaData
 *
 * @export
 * @interface G2MiniAreaData
 */
export interface G2MiniAreaData {
  x: any;
  y: any;
  [key: string]: any;
}

/**
 * G2MiniAreaComponent
 *
 * @export
 * @class G2MiniAreaComponent
 * @implements {OnInit}
 * @implements {OnChanges}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'g2-mini-area',
  template: ``,
  styleUrls: ['./g2-mini-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class G2MiniAreaComponent implements OnInit, OnChanges {
  private chart: any;

  @Input() public delay = 0;
  @Input() public color = 'rgba(24, 144, 255, 0.2)';
  @Input() public borderColor = '#1890FF';
  @Input() public borderWidth = 2;
  @Input() @HostBinding('style.height.px') public height: number | string = 56;
  @Input() public fit = true;
  @Input() public line = false;
  @Input() public animate = true;
  @Input() public xAxis: any;
  @Input() public yAxis: any;
  @Input() public padding: number[] = [8, 8, 8, 8];
  @Input() public data: G2MiniAreaData[] | undefined = [];
  @Input() public yTooltipSuffix = '';
  @Input() public tooltipType: 'mini' | 'default' = 'default';

  /**
   *Creates an instance of G2MiniAreaComponent.
   * @param {ElementRef} el
   * @param {NgZone} ngZone
   * @memberof G2MiniAreaComponent
   */
  constructor(private el: ElementRef, private ngZone: NgZone) {}

  /**
   * G2install
   *
   * @private
   * @memberof G2MiniAreaComponent
   */
  private install(): void {
    const {
      el,
      fit,
      height,
      padding,
      xAxis,
      yAxis,
      yTooltipSuffix,
      tooltipType,
      line,
    } = this;
    const chart = (this.chart = new G2.Chart({
      container: el.nativeElement,
      forceFit: fit,
      height,
      padding,
    }));

    if (!xAxis && !yAxis) {
      chart.axis(false);
    }

    if (xAxis) {
      chart.axis('x', xAxis);
    } else {
      chart.axis('x', false);
    }

    if (yAxis) {
      chart.axis('y', yAxis);
    } else {
      chart.axis('y', false);
    }

    chart.legend(false);
    chart.tooltip({
      type: tooltipType === 'mini' ? 'mini' : null,
      showTitle: false,
      hideMarkders: false,
      'g2-tooltip': { padding: 4 },
      'g2-tooltip-list-item': { margin: `0px 4px` },
    });

    chart
      .area()
      .position('x*y')
      .tooltip('x*y', (x: any, y: string) => ({
        name: x,
        value: y + yTooltipSuffix,
      }))
      .shape('smooth')
      .opacity(1);

    if (line) {
      chart.line().position('x*y').shape('smooth').opacity(1).tooltip(false);
    }

    chart.render();

    this.attachChart();
  }

  /**
   * attachChart
   *
   * @private
   * @returns
   * @memberof G2MiniAreaComponent
   */
  private attachChart(): void {
    const {
      chart,
      line,
      fit,
      height,
      animate,
      padding,
      data,
      color,
      borderColor,
      borderWidth,
    } = this;
    if (!chart || !data || data.length <= 0) {
      return;
    }

    const geoms = chart.get('geoms');
    geoms.forEach((g: { color: (arg0: string) => any }) => g.color(color));
    if (line) {
      geoms[1].color(borderColor).size(borderWidth);
    }

    chart.set('forceFit', fit);
    chart.set('height', height);
    chart.set('animate', animate);
    chart.set('padding', padding);

    chart.changeData(data);
  }

  /**
   * angular life cycle
   *
   * @memberof G2MiniAreaComponent
   */
  public ngOnInit(): void {
    this.ngZone.runOutsideAngular(() =>
      setTimeout(() => this.install(), this.delay)
    );
  }

  /**
   * angular life cycle
   *
   * @memberof G2MiniAreaComponent
   */
  public ngOnChanges(): void {
    this.ngZone.runOutsideAngular(() => this.attachChart());
  }
}
