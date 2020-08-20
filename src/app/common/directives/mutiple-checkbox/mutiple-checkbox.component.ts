import { Component, OnInit, Input, forwardRef, ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'mutiple-checkbox',
  templateUrl: './mutiple-checkbox.component.html',
  styleUrls: ['./mutiple-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MutipleCheckboxComponent),
      multi: true
    }
  ]
})
export class MutipleCheckboxComponent implements ControlValueAccessor {
  @Input() options: any[];
  @Input() _value: any[];
  checkedList = [];

  public selected;
  private disabled: boolean;
  private onChange: Function;
  private onTouched: Function;

  constructor(private element: ElementRef, private renderer: Renderer) { 
    this.onChange = (val: any) => {};
    this.onTouched = () => {};
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

  ngOnInit() {
  }
  onCheckboxChange(option, event) {
    if(event.target.checked) {
      this.checkedList.push(option.value);
    } else {
      for(var i=0 ; i < this.options.length; i++) {
        if(this.checkedList[i] == option.value){
          this.checkedList.splice(i,1);
        }
      }
    }

    this.value = this.checkedList;
  }

}
