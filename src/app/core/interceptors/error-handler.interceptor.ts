import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, of, throwError} from "rxjs";
import {ErrorResponse} from "@models/error/error-response";

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('HTTP Error:', error);

      // Procesar el error y formatearlo como ErrorResponse
      const errorResponse: ErrorResponse = {
        status: error.status,
        message: error.error?.message || error.message || 'Error desconocido',
      };

      // Propaga el error a los suscriptores
      return throwError(() => errorResponse);
    })
  );
};
