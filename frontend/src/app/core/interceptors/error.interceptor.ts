import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../services';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 0) {
        toast.error('Connessione non disponibile. Verifica la rete.');
      } else if (error.status === 404) {
        toast.error('Risorsa non trovata.');
      } else if (error.status === 503) {
        toast.error('Download temporaneamente non disponibile.');
      } else if (error.status >= 500) {
        toast.error('Errore del server, riprovare piu tardi.');
      }
      return throwError(() => error);
    })
  );
};
