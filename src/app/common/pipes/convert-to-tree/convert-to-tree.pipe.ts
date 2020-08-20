import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'ConvertToTree'
})
export class ConvertToTree implements PipeTransform {
  transform(value: any[], args: string[]): any {
    let topLevel = value.filter(child => !child.parent_id);
    return this.runReducer(value, topLevel);
  }
  runReducer(value, topLevelValues) {
    return topLevelValues.map(topLevelValue => {
      let children = value.filter(child => topLevelValue.id === child.parent_id);
      if (children.length > 0) {
        topLevelValue.children = this.runReducer(value, children);
      } else {
        topLevelValue.children = [];
      }
      return topLevelValue;
    });
  }
}
