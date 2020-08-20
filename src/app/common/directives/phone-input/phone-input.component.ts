import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Countries } from './countries';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PhoneInputComponent),
    multi: true
  }]
})
export class PhoneInputComponent implements ControlValueAccessor {
  @Input() _phoneData = {
    code: '',
    value: ''
  };

  public COUNTRIES = Countries;

  propagateChange = (val: any) => {};

  get phoneData() {
    return this._phoneData;
  }

  set phoneData(val) {
    this._phoneData = val;
    this.propagateChange(this._phoneData);
  }

  selectCountry(val) {
    this.phoneData = {...this.phoneData, code: val };
  }

  enterPhone(val) {
    this.phoneData = {...this.phoneData, value: val };
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.phoneData = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}
}
