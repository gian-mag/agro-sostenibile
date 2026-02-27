import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CompanyService, ReportService } from '../../core/services';
import { Company, Report } from '../../core/models';
import { CompanyCardComponent } from '../../shared/components/company-card/company-card.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CompanyCardComponent, LoadingSpinnerComponent],
  template: `
    <section class="company-list-section" role="main">
      <div class="container">
        <div class="section-header mb-4">
          <h1>Aziende del Settore Primario</h1>
          <p class="section-subtitle">
            Accedi ai report di sostenibilita dei principali operatori italiani e scopri
            le loro iniziative per un futuro piu verde e responsabile.
          </p>
        </div>

        <!-- Filtri -->
        <div class="filters-bar mb-4">
          <div class="row g-3 align-items-end">
            <div class="col-md-4">
              <label for="segment-filter" class="form-label">Filtra per segmento</label>
              <select
                id="segment-filter"
                class="form-select"
                [value]="selectedSegment()"
                (change)="onSegmentChange($event)"
              >
                <option value="">Tutti i segmenti</option>
                @for (seg of segments; track seg) {
                  <option [value]="seg">{{ seg }}</option>
                }
              </select>
            </div>
            <div class="col-md-4">
              <label for="year-filter" class="form-label">Filtra per anno</label>
              <select
                id="year-filter"
                class="form-select"
                [value]="selectedYear()"
                (change)="onYearChange($event)"
              >
                <option value="0">Tutti gli anni</option>
                @for (year of availableYears(); track year) {
                  <option [value]="year">{{ year }}</option>
                }
              </select>
            </div>
            <div class="col-md-4">
              @if (selectedSegment() || selectedYear()) {
                <button
                  type="button"
                  class="btn btn-outline-light w-100"
                  (click)="resetFilters()"
                >
                  <i class="bi bi-x-circle me-1"></i> Mostra tutti
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Loading -->
        @if (loading()) {
          <app-loading-spinner message="Caricamento aziende..." />
        }

        <!-- Error -->
        @else if (error()) {
          <div class="text-center py-5">
            <i class="bi bi-exclamation-triangle" style="font-size: 2.5rem; color: var(--color-error);"></i>
            <p class="mt-3" style="color: var(--color-text-secondary)">{{ error() }}</p>
            <button class="btn btn-primary mt-2" (click)="loadData()">
              <i class="bi bi-arrow-clockwise me-1"></i> Riprova
            </button>
          </div>
        }

        <!-- Empty -->
        @else if (filteredCompanies().length === 0) {
          <div class="text-center py-5">
            <i class="bi bi-search" style="font-size: 2.5rem; color: var(--color-text-secondary);"></i>
            <p class="mt-3" style="color: var(--color-text-secondary)">Nessuna azienda trovata per i filtri selezionati.</p>
            <button class="btn btn-outline-primary mt-2" (click)="resetFilters()">
              Mostra tutti
            </button>
          </div>
        }

        <!-- Grid -->
        @else {
          <div class="row g-4">
            @for (company of filteredCompanies(); track company.id) {
              <div class="col-lg-6">
                <app-company-card
                  [company]="company"
                  [reports]="getReportsForCompany(company.id)"
                />
              </div>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .company-list-section {
      padding: 2.5rem 0 4rem;
    }

    .section-header h1 {
      font-size: 2rem;
      font-weight: 800;
      color: var(--color-secondary);
    }

    .section-subtitle {
      color: var(--color-text-secondary);
      max-width: 600px;
      font-size: 1rem;
      margin-top: 0.5rem;
    }

    .filters-bar {
      background: var(--color-secondary);
      padding: 1.25rem;
      border-radius: 8px;

      .form-label {
        font-size: 0.85rem;
        font-weight: 500;
        color: rgba(245, 237, 224, 0.7);
      }

      .form-select {
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
        color: #F5EDE0;

        &:focus {
          border-color: var(--color-primary-light);
          box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.25);
          background-color: rgba(255, 255, 255, 0.15);
        }

        option {
          background: var(--color-secondary);
          color: #F5EDE0;
        }
      }
    }

    .btn-primary {
      background-color: var(--color-primary) !important;
      border-color: var(--color-primary) !important;

      &:hover {
        background-color: var(--color-primary-dark) !important;
        border-color: var(--color-primary-dark) !important;
      }
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
export class CompanyListComponent implements OnInit {
  private companyService = inject(CompanyService);
  private reportService = inject(ReportService);

  companies = signal<Company[]>([]);
  allReports = signal<Report[]>([]);
  availableYears = signal<number[]>([]);
  loading = signal(true);
  error = signal('');

  selectedSegment = signal('');
  selectedYear = signal(0);

  segments = ['Agricoltura', 'Allevamento', 'Pesca', 'Silvicoltura', 'Agroalimentare'];

  filteredCompanies = computed(() => {
    let result = this.companies();
    const segment = this.selectedSegment();
    const year = this.selectedYear();

    if (segment) {
      result = result.filter(c => c.segment === segment);
    }

    if (year) {
      const companyIdsWithYear = new Set(
        this.allReports()
          .filter(r => r.year === year)
          .map(r => r.companyId)
      );
      result = result.filter(c => companyIdsWithYear.has(c.id));
    }

    return result;
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);
    this.error.set('');

    forkJoin({
      companies: this.companyService.getAll(),
      reports: this.reportService.getAll(),
      years: this.reportService.getAvailableYears()
    }).subscribe({
      next: ({ companies, reports, years }) => {
        this.companies.set(companies);
        this.allReports.set(reports);
        this.availableYears.set(years.sort((a, b) => b - a));
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossibile caricare i dati. Verifica la connessione e riprova.');
        this.loading.set(false);
      }
    });
  }

  getReportsForCompany(companyId: number): Report[] {
    return this.allReports().filter(r => r.companyId === companyId);
  }

  onSegmentChange(event: Event): void {
    this.selectedSegment.set((event.target as HTMLSelectElement).value);
  }

  onYearChange(event: Event): void {
    this.selectedYear.set(Number((event.target as HTMLSelectElement).value));
  }

  resetFilters(): void {
    this.selectedSegment.set('');
    this.selectedYear.set(0);
  }
}
