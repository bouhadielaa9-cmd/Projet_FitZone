
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prix'
})
export class PrixPipe implements PipeTransform {

  transform(prix: number): string {
    return prix.toFixed(2) + ' DT';
  }

}
