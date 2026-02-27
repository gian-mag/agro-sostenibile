import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CompanyService, ReportService, ToastService } from '../../core/services';
import { Company, Report } from '../../core/models';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ReportSummaryModalComponent } from '../../shared/components/report-summary-modal/report-summary-modal.component';

@Component({
  selector: 'app-company-detail',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent, ReportSummaryModalComponent],
  templateUrl: './company-detail.component.html',
  styleUrl: './company-detail.component.scss'
})
export class CompanyDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private companyService = inject(CompanyService);
  private reportService = inject(ReportService);
  private toastService = inject(ToastService);

  company = signal<Company | null>(null);
  reports = signal<Report[]>([]);
  loading = signal(true);
  error = signal('');
  downloadingId = signal(0); // tiene traccia del report in download

  // Stato della modale resoconto
  showModal = signal(false);
  modalTitle = signal('');
  modalSummary = signal('');
  modalLoading = signal(false);

  sortedReports = signal<Report[]>([]);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error.set('ID azienda non valido.');
      this.loading.set(false);
      return;
    }

    // Prima carica l'azienda, poi i suoi report
    this.companyService.getById(id).subscribe({
      next: (company) => {
        this.company.set(company);
        this.loadReports(id);
      },
      error: () => {
        this.error.set('Azienda non trovata.');
        this.loading.set(false);
      }
    });
  }

  private loadReports(companyId: number): void {
    this.companyService.getReports(companyId).subscribe({
      next: (reports) => {
        this.reports.set(reports);
        this.sortedReports.set([...reports].sort((a, b) => b.year - a.year));
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  // Apre il PDF in una nuova tab del browser
  onPreview(report: Report): void {
    this.reportService.downloadPdf(report.id).subscribe({
      next: (blob) => {
        const pdfBlob = new Blob([blob], { type: 'application/pdf' });
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 60000);
      },
      error: () => {
        this.toastService.error('Impossibile aprire il PDF.');
      }
    });
  }

  // Scarica il PDF con nome file composto da azienda + anno
  onDownload(report: Report): void {
    if (this.downloadingId()) return;
    this.downloadingId.set(report.id);
    this.toastService.info('Download in corso...');

    this.reportService.downloadPdf(report.id).subscribe({
      next: (blob) => {
        const fileName = `${this.company()!.companyName.replace(/\s+/g, '_')}_Report_${report.year}.pdf`;
        this.reportService.triggerDownload(blob, fileName);
        this.downloadingId.set(0);
        this.toastService.success('File scaricato con successo!');
      },
      error: () => {
        this.downloadingId.set(0);
      }
    });
  }

  // Apre la modale e carica il resoconto dal backend
  onShowSummary(report: Report): void {
    this.modalTitle.set(`${this.company()!.companyName} - ${report.title}`);
    this.modalSummary.set('');
    this.modalLoading.set(true);
    this.showModal.set(true);

    this.reportService.getSummary(report.id).subscribe({
      next: (summary) => {
        this.modalSummary.set(summary);
        this.modalLoading.set(false);
      },
      error: () => {
        this.modalSummary.set('');
        this.modalLoading.set(false);
      }
    });
  }

  // Mappa segmento -> icona Bootstrap
  getSegmentIcon(segment: string): string {
    const icons: Record<string, string> = {
      'Agricoltura': 'bi bi-flower1',
      'Allevamento': 'bi bi-heart-pulse',
      'Pesca': 'bi bi-water',
      'Silvicoltura': 'bi bi-tree-fill'
    };
    return icons[segment] || 'bi bi-leaf';
  }
}
