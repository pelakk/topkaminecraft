import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'portCut'
})
export class PortCut implements PipeTransform {
  transform(value: string): string {
    if (value.includes(":25565")) {
      value = value.slice(0, value.length - 6);
    }
    return value;

  }
}

@Pipe({
  name: 'nullToDotted'
})
export class NullToDotted implements PipeTransform {
  transform(value: string): string {
    if (value === null) {
      value = '---';
    }
    return value;
  }
}



