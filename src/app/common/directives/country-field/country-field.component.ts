import { Component, OnInit, Input } from '@angular/core';
import { Countries } from './countries';

@Component({
  selector: 'app-country-field',
  templateUrl: './country-field.component.html',
  styleUrls: ['./country-field.component.scss']
})
export class CountryFieldComponent implements OnInit {

  @Input() modelName = '';

  public COUNTRIES = Countries;
  public country: any;
  public form: any;

  constructor() {}

  ngOnInit() {
    // console.log(this.COUNTRIES);
  }
}
