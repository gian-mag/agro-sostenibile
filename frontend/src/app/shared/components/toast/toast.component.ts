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
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
      color: #fff;
      font-size: 0.9rem;
      animation: slideIn 0.3s ease-out;
    }

    .toast-success { background-color: var(--color-success); }
    .toast-error { background-color: var(--color-error); }
    .toast-info { background-color: var(--color-accent); }
    .toast-warning { background-color: var(--color-warning); }

    .toast-close {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      margin-left: auto;
      opacity: 0.8;
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
