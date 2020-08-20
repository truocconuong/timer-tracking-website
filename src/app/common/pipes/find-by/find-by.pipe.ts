import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'findBy'
})
export class FindByPipe implements PipeTransform {
  transform(arr: any, path: string, value: any, type: any): any {
    if (!_.isArray(arr)) {
      return null;
    }
    switch (type) {
      case 'moreThan':
        return arr.find(item => _.get(item, path) > value);
      case 'lessThan':
        return arr.find(item => _.get(item, path) < value);
      case 'not':
        return arr.find(item => _.get(item, path) !== value);
      default:
        return arr.find(item => _.get(item, path) === value);
    }
  }
}
