import { Component, Input, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Company, Report } from '../../../core/models';
import { ReportService, ToastService } from '../../../core/services';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { ReportSummaryModalComponent } from '../report-summary-modal/report-summary-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-card',
  standalone: true,
  imports: [TruncatePipe, ReportSummaryModalComponent, RouterLink],
  template: `
    <div class="company-card">
      <div class="card-accent"></div>
      <div class="card-icon-area">
        <div class="card-icon-circle">
          <i [class]="getSegmentIcon(company.segment)"></i>
        </div>
      </div>
      <div class="card-content">
        <div class="card-header-row">
          <a [routerLink]="['/companies', company.id]" class="company-name">{{ company.companyName }}</a>
          <span class="badge-segment">{{ company.segment }}</span>
        </div>

        <p class="company-description">{{ company.description | truncate:150 }}</p>

        @if (reports.length > 0) {
          <div class="card-bottom-row">
            <div class="report-controls">
              <select
                [id]="'year-select-' + company.id"
                class="form-select form-select-sm"
                [value]="selectedReport?.id"
                (change)="onReportChange($event)"
                [attr.aria-label]="'Seleziona anno report per ' + company.companyName"
              >
                @for (report of sortedReports; track report.id) {
                  <option [value]="report.id">{{ report.year }}</option>
                }
              </select>
            </div>

            <div class="card-actions">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm btn-action"
                (click)="onPreview()"
                [disabled]="previewing()"
                [attr.aria-label]="'Anteprima PDF ' + company.companyName + ' ' + selectedReport?.year"
              >
                @if (previewing()) {
                  <span class="spinner-border spinner-border-sm me-1"></span> Apertura...
                } @else {
                  <i class="bi bi-eye me-1"></i> Anteprima
                }
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm btn-action"
                (click)="onDownload()"
                [disabled]="downloading()"
                [attr.aria-label]="'Scarica PDF ' + company.companyName + ' ' + selectedReport?.year"
              >
                @if (downloading()) {
                  <span class="spinner-border spinner-border-sm me-1"></span> Download...
                } @else {
                  <i class="bi bi-download me-1"></i> Scarica PDF
                }
              </button>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm btn-action"
                (click)="onShowSummary()"
                aria-label="Resoconto ultimo report"
              >
                <i class="bi bi-file-text me-1"></i> Resoconto
              </button>
            </div>
          </div>
        } @else {
          <p class="no-reports">Nessun report disponibile.</p>
        }
      </div>

      <!-- Modale anteprima PDF -->
      @if (showPreviewModal()) {
        <div class="modal-overlay" (click)="onOverlayClick($event, 'preview')" (keydown.escape)="closePreview()">
          <div class="modal-dialog modal-preview">
            <div class="modal-header">
              <h3 class="modal-title">{{ company.companyName }} - Report {{ selectedReport?.year }}</h3>
              <button type="button" class="btn-close-modal" (click)="closePreview()" aria-label="Chiudi">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body-preview">
              @if (previewUrl()) {
                <iframe [src]="previewUrl()!" title="Anteprima PDF" class="pdf-iframe"></iframe>
              } @else {
                <div class="text-center py-4">
                  <div class="spinner-border" style="color: var(--color-primary)"></div>
                  <p class="mt-2" style="color: var(--color-text-secondary)">Caricamento PDF...</p>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- Modale resoconto -->
      @if (showSummaryModal()) {
        <app-report-summary-modal
          [title]="summaryTitle()"
          [summary]="summaryText()"
          [loading]="summaryLoading()"
          [reportId]="company.id"
          (close)="showSummaryModal.set(false)"
        />
      }
    </div>
  `,
  styles: [`
    .company-card {
      background: var(--color-card);
      border-radius: 8px;
      border: 1px solid var(--color-card-border);
      height: 100%;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    }

    .card-accent {
      width: 6px;
      min-height: 100%;
      background: var(--color-primary);
      flex-shrink: 0;
    }

    .card-icon-area {
      display: flex;
      align-items: flex-start;
      padding: 1.25rem 0 1.25rem 1rem;
      flex-shrink: 0;
    }

    .card-icon-circle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: rgba(180, 83, 9, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.3rem;
      color: var(--color-primary);
    }

    .card-content {
      flex: 1;
      padding: 1.25rem 1.25rem 1.25rem 1rem;
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .card-header-row {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.4rem;
      flex-wrap: wrap;
    }

    .company-name {
      font-family: var(--font-heading);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--color-secondary);
      text-decoration: none;

      &:hover {
        color: var(--color-primary);
        text-decoration: underline;
      }
    }

    .company-description {
      color: var(--color-text-secondary);
      font-size: 0.85rem;
      line-height: 1.5;
      margin-bottom: 0.75rem;
      flex-grow: 1;
    }

    .card-bottom-row {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }

    .report-controls {
      .form-select {
        border-radius: 6px;
        border-color: var(--color-card-border);
        font-size: 0.8rem;
        padding: 0.25rem 2rem 0.25rem 0.5rem;

        &:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.15);
        }
      }
    }

    .card-actions {
      display: flex;
      gap: 0.4rem;
      flex-wrap: wrap;
    }

    .btn-action {
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.35rem 0.65rem;
      white-space: nowrap;
    }

    .btn-primary {
      background-color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;

      &:hover:not(:disabled) {
        background-color: var(--color-primary-dark) !important;
        border-color: var(--color-primary-dark) !important;
      }
    }

    .btn-outline-primary {
      color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;

      &:hover:not(:disabled) {
        background-color: var(--color-primary) !important;
        color: #fff !important;
      }
    }

    .no-reports {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      padding: 0.5rem 0;
      margin: 0;
    }

    /* Modale anteprima PDF */
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

    .modal-preview {
      background: var(--color-bg);
      border-radius: 8px;
      width: 100%;
      max-width: 900px;
      height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(30, 58, 47, 0.3);
      pointer-events: auto;
      animation: slideUp 0.25s ease-out;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 2px solid var(--color-primary-light);
    }

    .modal-title {
      font-family: var(--font-heading);
      font-size: 1rem;
      font-weight: 700;
      color: var(--color-secondary);
      margin: 0;
    }

    .btn-close-modal {
      background: none;
      border: none;
      font-size: 1.2rem;
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 6px;

      &:hover {
        background-color: rgba(180, 83, 9, 0.08);
        color: var(--color-primary);
      }
    }

    .modal-body-preview {
      flex: 1;
      overflow: hidden;
    }

    .pdf-iframe {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 0 0 8px 8px;
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
      .company-card {
        flex-direction: column;
      }

      .card-accent {
        width: 100%;
        min-height: 4px;
        height: 4px;
      }

      .card-icon-area {
        padding: 1rem 1rem 0;
      }

      .card-bottom-row {
        flex-direction: column;
        align-items: stretch;
      }

      .card-actions {
        justify-content: flex-start;
      }

      .modal-preview {
        height: 90vh;
      }
    }
  `]
})
export class CompanyCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) company!: Company;
  @Input() reports: Report[] = [];

  private reportService = inject(ReportService);
  private toastService = inject(ToastService);
  private sanitizer = inject(DomSanitizer);

  sortedReports: Report[] = [];
  selectedReport: Report | null = null;

  downloading = signal(false);
  previewing = signal(false);

  // Stato modale anteprima PDF
  showPreviewModal = signal(false);
  previewUrl = signal<SafeResourceUrl | null>(null);
  private rawPreviewUrl: string | null = null;

  // Stato modale resoconto
  showSummaryModal = signal(false);
  summaryTitle = signal('');
  summaryText = signal('');
  summaryLoading = signal(false);

  ngOnInit(): void {
    // Ordina per anno decrescente e seleziona il piu recente
    this.sortedReports = [...this.reports].sort((a, b) => b.year - a.year);
    this.selectedReport = this.sortedReports[0] || null;
  }

  ngOnDestroy(): void {
    this.revokePreviewUrl();
  }

  onReportChange(event: Event): void {
    const reportId = Number((event.target as HTMLSelectElement).value);
    this.selectedReport = this.sortedReports.find(r => r.id === reportId) || null;
  }

  // Scarica il blob PDF e lo mostra in un iframe dentro la modale
  onPreview(): void {
    if (!this.selectedReport || this.previewing()) return;
    this.previewing.set(true);
    this.revokePreviewUrl();
    this.previewUrl.set(null);
    this.showPreviewModal.set(true);

    this.reportService.downloadPdf(this.selectedReport.id).subscribe({
      next: (blob) => {
        const pdfBlob = new Blob([blob], { type: 'application/pdf' });
        this.rawPreviewUrl = URL.createObjectURL(pdfBlob);
        this.previewUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(this.rawPreviewUrl));
        this.previewing.set(false);
      },
      error: () => {
        this.previewing.set(false);
        this.showPreviewModal.set(false);
        this.toastService.error('Impossibile caricare il PDF.');
      }
    });
  }

  closePreview(): void {
    this.showPreviewModal.set(false);
    this.revokePreviewUrl();
  }

  onDownload(): void {
    if (!this.selectedReport || this.downloading()) return;
    this.downloading.set(true);
    this.toastService.info('Download in corso...');

    this.reportService.downloadPdf(this.selectedReport.id).subscribe({
      next: (blob) => {
        const fileName = `${this.company.companyName.replace(/\s+/g, '_')}_Report_${this.selectedReport!.year}.pdf`;
        this.reportService.triggerDownload(blob, fileName);
        this.downloading.set(false);
        this.toastService.success('File scaricato con successo!');
      },
      error: () => {
        this.downloading.set(false);
      }
    });
  }

  // Mostra il resoconto del report piu recente
  onShowSummary(): void {
    const latestReport = this.sortedReports[0];
    if (!latestReport) return;

    this.summaryTitle.set(`${this.company.companyName} - ${latestReport.title}`);
    this.summaryText.set('');
    this.summaryLoading.set(true);
    this.showSummaryModal.set(true);

    this.reportService.getSummary(latestReport.id).subscribe({
      next: (summary) => {
        this.summaryText.set(summary || '');
        this.summaryLoading.set(false);
      },
      error: () => {
        this.summaryText.set('');
        this.summaryLoading.set(false);
        this.toastService.warning('Resoconto non disponibile per questo report.');
      }
    });
  }

  // Chiude la modale solo se il click e sull'overlay (non sul contenuto)
  onOverlayClick(event: MouseEvent, type: string): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      if (type === 'preview') this.closePreview();
    }
  }

  getSegmentIcon(segment: string): string {
    const icons: Record<string, string> = {
      'Agricoltura': 'bi bi-flower1',
      'Allevamento': 'bi bi-heart-pulse',
      'Pesca': 'bi bi-water',
      'Silvicoltura': 'bi bi-tree-fill',
      'Agroalimentare': 'bi bi-basket'
    };
    return icons[segment] || 'bi bi-leaf';
  }

  // Libera l'object URL per evitare memory leak
  private revokePreviewUrl(): void {
    if (this.rawPreviewUrl) {
      URL.revokeObjectURL(this.rawPreviewUrl);
      this.rawPreviewUrl = null;
    }
    this.previewUrl.set(null);
  }
}
