import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], ...criterias: any[]): any[] {
    let fields = [];
    let directions = [];
    _.forEach(criterias, item => {
      fields.push(item[0]);
      directions.push(item[1]);
    });
    if (_.filter(directions, item => !_.isNil(item)).length > 0) {
      value = _.orderBy.apply(null, [value, fields, directions]);
    } else {
      return value;
    }
    return value;
  }
}
