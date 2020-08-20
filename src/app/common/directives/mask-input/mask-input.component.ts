import { Component, OnInit, Input, forwardRef, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'mask-input',
  templateUrl: './mask-input.component.html',
  styleUrls: ['./mask-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MaskInputComponent),
      multi: true
    }
  ]
})
export class MaskInputComponent implements ControlValueAccessor {
  // @Input() inputMaskText: [];
  @Input() inputMaskText;
  @Input() guide: boolean;
  @Input() _value: string;
  @Input() valueWithCharacter: boolean;
  public myModel = '';
  public selected;
  private disabled: boolean;
  private onChange: Function;
  private onTouched: Function;
  constructor(private element: ElementRef, private renderer: Renderer) {
    this.onChange = (val: any) => { };
    this.onTouched = () => { };
    this.disabled = false;
  }

  writeValue(val: any): void {
    if (val) {
      this.value = val;
    }
  }

  get value() {
    return this._value;
  }

  set value(val) {
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

  ngOnInit() {
    console.log(this.guide);
  }
  change() {
    if (this.valueWithCharacter === true) {
      this.value = this.myModel
    } else {
      this.value = this.myModel.replace(/\D+/g, '');
    }
    console.log(this.value);
  }

  // https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme


}
