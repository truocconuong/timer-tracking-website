import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'sumBy'
})
export class SumByPipe implements PipeTransform {
  transform(value: any[], path: any): any {
    if (!_.isArray(value)) {
      return 0;
    } else {
      if (value.length === 0) {
        return 0;
      } else {
        return _.sumBy(value, item => Number(_.get(item, path)));
      }
    }
  }
}
