import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "lodash";

@Pipe({
  name: "length"
})
export class LengthPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!_.isArray(value)) {
      return 0;
    } else {
      return value.length;
    }
  }
}
