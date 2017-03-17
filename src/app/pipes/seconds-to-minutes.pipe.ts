import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToMinutes'
})
export class SecondsToMinutesPipe implements PipeTransform {
  transform(value: number): number {
    var minutesWithFraction = (value/60);
    //var fraction = minutesWithFraction mod something
    //var minutes =
    //take a look at incorporating momentjs in here
    return isNaN(value)?undefined:Math.round(minutesWithFraction * 100) / 100;
  }

}
