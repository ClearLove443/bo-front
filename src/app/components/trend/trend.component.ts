import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';

/**
 * TrendComponent
 *
 * @export
 * @class TrendComponent
 */
@Component({
  selector: 'trend',
  templateUrl: './trend.component.html',
  styleUrls: ['./trend.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendComponent {
  @Input()
  public flag!: 'up' | 'down';
  @Input() @InputBoolean() public colorful = true;
  @Input() @InputBoolean() public reverseColor = false;
}
