import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: unknown): unknown {
    if(value === 'woman') {
      return 'Kobieta';
    }
    if(value === 'man') {
      return 'Mężczyzna';
    }
    return '';
  }

}
