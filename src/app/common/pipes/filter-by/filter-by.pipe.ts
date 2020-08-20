import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {
  transform(arr: any, path: string, value: any, type: any): any {
    if (!_.isArray(arr)) {
      return null;
    }
    if (_.isArray(value)) {
      return _.filter(arr, item => _.includes(value, _.get(item, path)));
    } else {
      switch (type) {
        case 'moreThan':
          return _.filter(arr, item => _.get(item, path) > value);
        case 'lessThan':
          return _.filter(arr, item => _.get(item, path) < value);
        case 'not':
          return _.filter(arr, item => _.get(item, path) !== value);
        default:
          return _.filter(arr, item => _.get(item, path) === value);
      }
    }
  }
}
