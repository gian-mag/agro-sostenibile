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
              <div class="spinner-border text-success spinner-border-sm"></div>
              <p class="text-muted mt-2">Caricamento resoconto...</p>
            </div>
          } @else if (summary) {
            <div class="summary-content">
              @for (paragraph of summaryParagraphs; track $index) {
                <p>{{ paragraph }}</p>
              }
            </div>
          } @else {
            <p class="text-muted text-center py-3">Resoconto non disponibile per questo report.</p>
          }
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" (click)="close.emit()">
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
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1050;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      animation: fadeIn 0.2s;
    }

    .modal-dialog {
      background: #fff;
      border-radius: 16px;
      width: 100%;
      max-width: 700px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      animation: scaleIn 0.2s ease-out;
      pointer-events: auto;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #eee;
    }

    .modal-title {
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
        background-color: #f0f0f0;
        color: var(--color-text);
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
      border-top: 1px solid #eee;
      display: flex;
      justify-content: flex-end;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    @media (max-width: 576px) {
      .modal-dialog {
        max-height: 90vh;
        border-radius: 12px;
      }
      .modal-header, .modal-body, .modal-footer {
        padding: 1rem;
      }
    }
  `]
})
export class ReportSummaryModalComponent implements AfterViewInit, OnDestroy {
  @Input() title = '';
  @Input() summary = '';
  @Input() loading = false;
  @Input() reportId = 0;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalDialog') modalDialog!: ElementRef<HTMLElement>;

  private previousFocus: HTMLElement | null = null;

  get summaryParagraphs(): string[] {
    return this.summary ? this.summary.split('\n').filter(p => p.trim()) : [];
  }

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
