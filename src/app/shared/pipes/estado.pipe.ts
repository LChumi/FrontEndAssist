import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estado',
  standalone: true
})
export class EstadoPipe implements PipeTransform {

  transform(value: number): string {
    switch (value) {
      case 0: return 'En proceso';
      case 1: return 'Grabado';
      case 2: return 'Mayorizado';
      case 3: return 'Aut Final';
      case 4: return 'Pend Contab';
      case 9: return 'Anulado';
      default: return 'Desconocido';
    }
  }

}
