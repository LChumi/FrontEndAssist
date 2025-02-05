import { CanDeactivateFn } from '@angular/router';
import {inject} from "@angular/core";
import {ConfirmationService, MessageService} from "primeng/api";

export const returnGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const confirmationService = inject(ConfirmationService);
  const toastService = inject(MessageService);

  return new Promise<boolean>((resolve) => {
    confirmationService.confirm({
      message: 'Tienes cambios sin guardar. ¿Estas seguro de que quieres salir?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        resolve(true);
      },
      reject: () => {

        resolve(false);
      }
    })
  })
};
