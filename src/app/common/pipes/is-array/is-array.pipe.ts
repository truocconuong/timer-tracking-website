import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "isArray"
})
export class IsArrayPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return Array.isArray(value);
  }
}
