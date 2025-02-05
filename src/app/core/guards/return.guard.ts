import { CanDeactivateFn } from '@angular/router';

export const returnGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return confirm('Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?');
};
