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
      <div class="card-header-section">
        <div class="card-icon">
          <i [class]="getSegmentIcon(company.segment)"></i>
        </div>
        <a [routerLink]="['/companies', company.id]" class="company-name">{{ company.companyName }}</a>
        <span class="badge-segment">{{ company.segment }}</span>
      </div>

      <p class="company-description">{{ company.description | truncate:150 }}</p>

      @if (reports.length > 0) {
        <div class="report-controls">
          <label class="select-label" [for]="'year-select-' + company.id">Seleziona anno:</label>
          <select
            [id]="'year-select-' + company.id"
            class="form-select form-select-sm"
            [value]="selectedReport?.id"
            (change)="onReportChange($event)"
            [attr.aria-label]="'Seleziona anno report per ' + company.companyName"
          >
            @for (report of sortedReports; track report.id) {
              <option [value]="report.id">Report {{ report.year }}</option>
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
              <i class="bi bi-eye"></i> Anteprima
            }
          </button>
          <button
            type="button"
            class="btn btn-primary btn-sm btn-action btn-download"
            (click)="onDownload()"
            [disabled]="downloading()"
            [attr.aria-label]="'Scarica PDF ' + company.companyName + ' ' + selectedReport?.year"
          >
            @if (downloading()) {
              <span class="spinner-border spinner-border-sm me-1"></span> Download...
            } @else {
              <i class="bi bi-download"></i> Scarica PDF
            }
          </button>
        </div>

        <button
          type="button"
          class="btn btn-outline-secondary btn-sm btn-summary w-100"
          (click)="onShowSummary()"
          aria-label="Resoconto ultimo report"
        >
          <i class="bi bi-file-text"></i> Resoconto ultimo report
        </button>
      } @else {
        <p class="no-reports text-muted">Nessun report disponibile.</p>
      }

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
                  <div class="spinner-border text-success"></div>
                  <p class="text-muted mt-2">Caricamento PDF...</p>
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
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
      border: 1px solid rgba(0, 0, 0, 0.08);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .card-header-section {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-bottom: 0.75rem;
    }

    .card-icon {
      font-size: 1.5rem;
      color: var(--color-primary);
    }

    .company-name {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-primary);
      text-decoration: none;

      &:hover {
        color: var(--color-primary-dark);
        text-decoration: underline;
      }
    }

    .company-description {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
      margin-bottom: 1rem;
      flex-grow: 1;
    }

    .report-controls {
      margin-bottom: 0.75rem;

      .select-label {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--color-text-secondary);
        margin-bottom: 0.25rem;
        display: block;
      }

      .form-select {
        border-radius: 10px;
        border-color: #ddd;

        &:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(46, 125, 50, 0.15);
        }
      }
    }

    .card-actions {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .btn-action {
      flex: 1;
      border-radius: 10px;
      font-weight: 500;
      font-size: 0.85rem;
      padding: 0.5rem;
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

    .btn-summary {
      border-radius: 10px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .no-reports {
      font-size: 0.9rem;
      text-align: center;
      padding: 1rem 0;
    }

    /* Modale anteprima PDF */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1050;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .modal-preview {
      background: #fff;
      border-radius: 12px;
      width: 100%;
      max-width: 900px;
      height: 85vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      pointer-events: auto;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid #eee;
    }

    .modal-title {
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
        background-color: #f0f0f0;
        color: var(--color-text);
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
      border-radius: 0 0 12px 12px;
    }

    @media (max-width: 576px) {
      .card-actions {
        flex-direction: column;
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

  showPreviewModal = signal(false);
  previewUrl = signal<SafeResourceUrl | null>(null);
  private rawPreviewUrl: string | null = null;

  showSummaryModal = signal(false);
  summaryTitle = signal('');
  summaryText = signal('');
  summaryLoading = signal(false);

  ngOnInit(): void {
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

  private revokePreviewUrl(): void {
    if (this.rawPreviewUrl) {
      URL.revokeObjectURL(this.rawPreviewUrl);
      this.rawPreviewUrl = null;
    }
    this.previewUrl.set(null);
  }
}
