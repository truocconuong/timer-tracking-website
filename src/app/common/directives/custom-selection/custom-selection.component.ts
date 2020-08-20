import { Component, OnInit, Input, forwardRef, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'custom-selection',
  templateUrl: './custom-selection.component.html',
  styleUrls: ['./custom-selection.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomSelectionComponent),
      multi: true
    }
  ]
})
export class CustomSelectionComponent implements ControlValueAccessor {
  @Input() _value;
  @Input() options: any[];
  @Input() disableUpdate: any;

  public selected;
  public disabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  constructor(private element: ElementRef, private renderer: Renderer) {
    this.onChange = (val: any) => {};
    this.onTouched = () => {};
    this.disabled = false;
  }

  public triggerChanged() {
    let event = new CustomEvent('change', { bubbles: true });
    this.renderer.invokeElementMethod(this.element.nativeElement, 'dispatchEvent', [event]);
  }

  writeValue(val: any): void {
    if (val || val === 0) {
      this.value = val;
    }
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this.selected = _.find(this.options, item => item.value === val);
    this._value = val;
    this.onChange(this._value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  change(opt) {
    this.value = opt.value;
    this.triggerChanged();
  }
}
