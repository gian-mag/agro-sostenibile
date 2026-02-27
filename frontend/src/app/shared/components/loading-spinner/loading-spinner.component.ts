import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner-wrapper" [attr.aria-label]="message" role="status">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">{{ message }}</span>
      </div>
      @if (showMessage) {
        <p class="spinner-text">{{ message }}</p>
      }
    </div>
  `,
  styles: [`
    .spinner-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      gap: 1rem;
    }

    .spinner-text {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() message = 'Caricamento in corso...';
  @Input() showMessage = true;
}
