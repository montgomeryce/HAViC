import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metersToMiles'
})
export class MetersToMilesPipe implements PipeTransform {

  transform(value: number): number {
    return isNaN(value)?undefined:value/1609.344;
  }

}
