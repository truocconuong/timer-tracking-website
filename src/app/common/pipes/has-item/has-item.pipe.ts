import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: "hasItem"
})
export class HasItemPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!_.isArray(value)) {
      return false;
    } else {
      if (value.length === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
}
