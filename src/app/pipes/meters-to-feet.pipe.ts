import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToFeet'
})
export class MetersToFeetPipe implements PipeTransform {
  transform(value: number): number {
    return isNaN(value)?undefined:value* 3.280839895;
  }

}
