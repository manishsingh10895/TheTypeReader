import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characters'
})
export class CharactersPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.split('');
  }

}
