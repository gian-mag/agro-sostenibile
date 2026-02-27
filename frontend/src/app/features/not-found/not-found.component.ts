import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found text-center" role="main">
      <i class="bi bi-compass" style="font-size: 4rem; color: var(--color-primary-light);"></i>
      <h1>404</h1>
      <p class="text-muted">Pagina non trovata.</p>
      <a routerLink="/" class="btn btn-primary">
        <i class="bi bi-house me-1"></i>Torna alla Home
      </a>
    </div>
  `,
  styles: [`
    .not-found {
      padding: 6rem 0;

      h1 {
        font-size: 4rem;
        font-weight: 800;
        color: var(--color-secondary);
        margin: 1rem 0 0.5rem;
      }

      .btn-primary {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
        border-radius: 8px;
        margin-top: 1rem;
      }
    }
  `]
})
export class NotFoundComponent {}
