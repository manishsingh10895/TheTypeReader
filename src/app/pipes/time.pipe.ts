import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    let minutes = Math.floor(value/60);
    let seconds = value % 60;

    return minutes + " m " + seconds + "s ";
  }

}
