import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'flatMap'
})
export class FlatMapPipe implements PipeTransform {
  transform(collection: any[], callable: Function): any[] {
    return _.flatMap(collection, callable);
  }
}
