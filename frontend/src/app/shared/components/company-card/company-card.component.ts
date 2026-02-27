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
  templateUrl: './company-card.component.html',
  styleUrl: './company-card.component.scss'
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
      'Silvicoltura': 'bi bi-tree-fill'
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
