import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import { environment } from '../../../../environments/environment';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let format = _.has(environment, 'dateFormat') ? (environment as any).dateFormat : 'dddd, DD MMMM YYYY, HH:mm';
    let m = moment(value).format(format);
    return m;
  }
}
