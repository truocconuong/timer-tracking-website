import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'arrayKeyValue'
})
export class ArrayKeyValue implements PipeTransform {
  transform(value: any[], args: string[]): any {
    return value.map((val, key) => {
      return {
        key,
        val
      };
    });
  }
}
