import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'words'
})
export class WordsPipe implements PipeTransform {

  transform(value: string, args?: any): Array<string> {
    console.log(value);
    if(typeof value === 'string') 
      return value.split(' ').filter((value) => value != '' );
    else 
      return value;
  }

}
