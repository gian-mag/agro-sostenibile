import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-report-summary-modal',
  standalone: true,
  template: `
    <div
      class="modal-overlay"
      (click)="onOverlayClick($event)"
      (keydown.escape)="close.emit()"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="'modal-title-' + reportId"
    >
      <div class="modal-dialog" #modalDialog tabindex="-1">
        <div class="modal-header">
          <h3 [id]="'modal-title-' + reportId" class="modal-title">{{ title }}</h3>
          <button
            type="button"
            class="btn-close-modal"
            (click)="close.emit()"
            aria-label="Chiudi"
          >
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body">
          @if (loading) {
            <div class="text-center py-4">
              <div class="spinner-border spinner-border-sm" style="color: var(--color-primary)"></div>
              <p class="mt-2" style="color: var(--color-text-secondary)">Caricamento resoconto...</p>
            </div>
          } @else if (summary) {
            <div class="summary-content">
              @for (paragraph of summaryParagraphs; track $index) {
                <p>{{ paragraph }}</p>
              }
            </div>
          } @else {
            <p class="text-center py-3" style="color: var(--color-text-secondary)">Resoconto non disponibile per questo report.</p>
          }
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" (click)="close.emit()">
            Chiudi
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(30, 58, 47, 0.7);
      z-index: 1050;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.2s;
    }

    .modal-dialog {
      background: var(--color-bg);
      border-radius: 8px;
      width: 100%;
      max-width: 700px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(30, 58, 47, 0.25);
      animation: slideUp 0.25s ease-out;
      pointer-events: auto;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 2px solid var(--color-primary-light);
    }

    .modal-title {
      font-family: var(--font-heading);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-secondary);
      margin: 0;
      padding-right: 1rem;
    }

    .btn-close-modal {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 6px;
      transition: all 0.2s;
      flex-shrink: 0;

      &:hover {
        background-color: rgba(180, 83, 9, 0.08);
        color: var(--color-primary);
      }
    }

    .modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      max-height: 60vh;
      line-height: 1.7;
    }

    .summary-content p {
      margin-bottom: 1rem;
      color: var(--color-text);

      &:last-child { margin-bottom: 0; }
    }

    .modal-footer {
      padding: 1rem 1.5rem;
      border-top: 1px solid var(--color-card-border);
      display: flex;
      justify-content: flex-end;

      .btn-primary {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
        border-radius: 6px;
        font-weight: 600;

        &:hover {
          background-color: var(--color-primary-dark);
          border-color: var(--color-primary-dark);
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    @media (max-width: 576px) {
      .modal-dialog {
        max-height: 90vh;
      }
      .modal-header, .modal-body, .modal-footer {
        padding: 1rem;
      }
    }
  `]
})
// Modale riutilizzabile per mostrare il resoconto di un report
export class ReportSummaryModalComponent implements AfterViewInit, OnDestroy {
  @Input() title = '';
  @Input() summary = '';
  @Input() loading = false;
  @Input() reportId = 0;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalDialog') modalDialog!: ElementRef<HTMLElement>;

  private previousFocus: HTMLElement | null = null;

  // Splitta il testo in paragrafi per il rendering
  get summaryParagraphs(): string[] {
    return this.summary ? this.summary.split('\n').filter(p => p.trim()) : [];
  }

  // Gestione focus: salva il focus attuale e lo ripristina alla chiusura
  ngAfterViewInit(): void {
    this.previousFocus = document.activeElement as HTMLElement;
    setTimeout(() => this.modalDialog?.nativeElement.focus());
  }

  ngOnDestroy(): void {
    this.previousFocus?.focus();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close.emit();
    }
  }
}
