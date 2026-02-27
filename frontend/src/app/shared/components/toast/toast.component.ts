import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services';

@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
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
