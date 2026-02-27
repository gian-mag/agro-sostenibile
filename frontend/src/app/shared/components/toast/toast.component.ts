import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services';

@Component({
  selector: 'app-toast',
  standalone: true,
  template: `
    <div class="toast-container" aria-live="assertive">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast-item" [class]="'toast-' + toast.type" role="alert">
          <i [class]="getIcon(toast.type)"></i>
          <span class="toast-message">{{ toast.message }}</span>
          <button
            type="button"
            class="toast-close"
            (click)="toastService.dismiss(toast.id)"
            aria-label="Chiudi notifica"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      max-width: 400px;
    }

    .toast-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.85rem 1rem;
      border-radius: 8px;
      background-color: var(--color-bg);
      color: var(--color-text);
      font-size: 0.9rem;
      border-left: 4px solid transparent;
      box-shadow: 0 4px 16px rgba(61, 50, 40, 0.12);
      animation: slideIn 0.3s ease-out;
    }

    .toast-success {
      border-left-color: var(--color-success);
      i:first-child { color: var(--color-success); }
    }
    .toast-error {
      border-left-color: var(--color-error);
      i:first-child { color: var(--color-error); }
    }
    .toast-info {
      border-left-color: var(--color-accent);
      i:first-child { color: var(--color-accent); }
    }
    .toast-warning {
      border-left-color: var(--color-warning);
      i:first-child { color: var(--color-warning); }
    }

    .toast-close {
      background: none;
      border: none;
      color: var(--color-text-secondary);
      cursor: pointer;
      margin-left: auto;
      opacity: 0.7;
      padding: 0;

      &:hover { opacity: 1; }
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      success: 'bi bi-check-circle-fill',
      error: 'bi bi-exclamation-triangle-fill',
      info: 'bi bi-info-circle-fill',
      warning: 'bi bi-exclamation-circle-fill'
    };
    return icons[type] || icons['info'];
  }
}
