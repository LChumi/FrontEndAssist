import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado',
  standalone: true
})
export class EstadoPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0: return 'EN PROCESO';
      case 1: return 'GRABADO';
      case 2: return 'MAYORIZADO';
      case 3: return 'AUT FINAL';
      case 4: return 'PEND CONTAB';
      case 9: return 'ANULADO';
      default: return 'DESCONOCIDO';
    }
  }

}
