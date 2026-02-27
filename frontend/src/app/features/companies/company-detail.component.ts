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
  template: `
    <section class="detail-section" role="main">
      <div class="container">
        <!-- Breadcrumb -->
        <nav aria-label="Breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a routerLink="/">Home</a></li>
            <li class="breadcrumb-item"><a routerLink="/companies">Aziende</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ company()?.companyName }}</li>
          </ol>
        </nav>

        @if (loading()) {
          <app-loading-spinner message="Caricamento azienda..." />
        } @else if (error()) {
          <div class="text-center py-5">
            <i class="bi bi-exclamation-triangle text-danger" style="font-size: 2.5rem;"></i>
            <p class="mt-3">{{ error() }}</p>
            <a routerLink="/companies" class="btn btn-primary mt-2">Torna alle aziende</a>
          </div>
        } @else if (company(); as c) {
          <!-- Header -->
          <div class="company-header mb-4">
            <div class="d-flex align-items-start gap-3">
              <div class="company-icon-lg">
                <i [class]="getSegmentIcon(c.segment)"></i>
              </div>
              <div>
                <h1 class="company-title">{{ c.companyName }}</h1>
                <span class="badge-segment">{{ c.segment }}</span>
                @if (c.websiteUrl) {
                  <a [href]="c.websiteUrl" target="_blank" rel="noopener" class="ms-2 website-link">
                    <i class="bi bi-box-arrow-up-right me-1"></i>Sito web
                  </a>
                }
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="company-description-full mb-4">
            <p>{{ c.description }}</p>
            @if (c.history) {
              <p class="text-muted">{{ c.history }}</p>
            }
          </div>

          <!-- Reports -->
          <h2 class="mb-3">Report di Sostenibilita</h2>
          @if (reports().length === 0) {
            <p class="text-muted">Nessun report disponibile per questa azienda.</p>
          } @else {
            <div class="table-responsive">
              <table class="table table-reports" aria-label="Lista report di sostenibilita">
                <thead>
                  <tr>
                    <th scope="col">Anno</th>
                    <th scope="col">Titolo</th>
                    <th scope="col">Standard</th>
                    <th scope="col">Tag</th>
                    <th scope="col">Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  @for (report of sortedReports(); track report.id) {
                    <tr>
                      <td><strong>{{ report.year }}</strong></td>
                      <td>{{ report.title }}</td>
                      <td>
                        @if (report.standard) {
                          <span class="badge bg-light text-dark">{{ report.standard }}</span>
                        } @else {
                          <span class="text-muted">-</span>
                        }
                      </td>
                      <td>
                        @if (report.tags) {
                          @for (tag of report.tags.split(','); track tag) {
                            <span class="badge-tag">{{ tag.trim() }}</span>
                          }
                        } @else {
                          <span class="text-muted">-</span>
                        }
                      </td>
                      <td>
                        <div class="btn-group-sm d-flex gap-1 flex-wrap">
                          <button
                            class="btn btn-outline-primary btn-sm"
                            (click)="onPreview(report)"
                            [attr.aria-label]="'Anteprima report ' + report.year"
                          >
                            <i class="bi bi-eye"></i>
                          </button>
                          <button
                            class="btn btn-primary btn-sm"
                            (click)="onDownload(report)"
                            [disabled]="downloadingId() === report.id"
                            [attr.aria-label]="'Scarica report ' + report.year"
                          >
                            @if (downloadingId() === report.id) {
                              <span class="spinner-border spinner-border-sm"></span>
                            } @else {
                              <i class="bi bi-download"></i>
                            }
                          </button>
                          <button
                            class="btn btn-outline-secondary btn-sm"
                            (click)="onShowSummary(report)"
                            [attr.aria-label]="'Resoconto report ' + report.year"
                          >
                            <i class="bi bi-file-text"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        }

        @if (showModal()) {
          <app-report-summary-modal
            [title]="modalTitle()"
            [summary]="modalSummary()"
            [loading]="modalLoading()"
            [reportId]="0"
            (close)="showModal.set(false)"
          />
        }
      </div>
    </section>
  `,
  styles: [`
    .detail-section {
      padding: 2rem 0 4rem;
    }

    .breadcrumb {
      font-size: 0.9rem;

      a {
        color: var(--color-primary);
      }
    }

    .company-icon-lg {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      background: rgba(46, 125, 50, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: var(--color-primary);
      flex-shrink: 0;
    }

    .company-title {
      font-size: 1.8rem;
      margin-bottom: 0.25rem;
    }

    .website-link {
      font-size: 0.85rem;
      color: var(--color-accent);
    }

    .company-description-full {
      p {
        line-height: 1.8;
        font-size: 1rem;
      }
    }

    .table-reports {
      th {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.3px;
        border-bottom: 2px solid #eee;
      }

      td {
        vertical-align: middle;
        font-size: 0.9rem;
      }
    }

    .badge-tag {
      display: inline-block;
      padding: 0.15rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 50px;
      background: rgba(2, 136, 209, 0.1);
      color: var(--color-accent);
      margin: 0.1rem;
    }

    .btn-primary {
      background-color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;
    }

    .btn-outline-primary {
      color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;

      &:hover {
        background-color: var(--color-primary) !important;
        color: #fff !important;
      }
    }
  `]
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
  downloadingId = signal(0);

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
}
