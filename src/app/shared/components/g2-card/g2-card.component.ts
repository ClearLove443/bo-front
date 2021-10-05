import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  TemplateRef,
} from '@angular/core';
import { InputBoolean } from 'ng-zorro-antd/core/util';

/**
 * G2CardComponent
 *
 * @export
 * @class G2CardComponent
 * @implements {OnChanges}
 */
@Component({
  selector: 'g2-card',
  templateUrl: './g2-card.component.html',
  styleUrls: ['./g2-card.component.scss'],
})
export class G2CardComponent implements OnChanges {
  @Input() @InputBoolean() public bordered = false;
  @Input()
  public avatar!: TemplateRef<any> | null;
  @Input()
  public title!: TemplateRef<any> | null;
  @Input()
  public action!: TemplateRef<any> | null;
  @Input() public total = '';
  @Input() public contentClass = '';
  public _height = 'auto';
  public _orgHeight!: number | string;
  @Input()
  set contentHeight(value: number | string) {
    this._orgHeight = value;
    this._height =
      typeof value === 'number' ? (this._height = `${value}px`) : value;
  }
  @Input()
  public footer!: TemplateRef<any> | null;
  @Input() public loading: boolean | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * angular life-cycle
   *
   * @memberof G2CardComponent
   */
  public ngOnChanges(): void {
    this.cdr.detectChanges();
  }
}
