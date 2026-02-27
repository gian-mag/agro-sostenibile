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
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent implements OnInit {
  private companyService = inject(CompanyService);
  private reportService = inject(ReportService);

  // Stato reattivo della pagina
  companies = signal<Company[]>([]);
  allReports = signal<Report[]>([]);
  availableYears = signal<number[]>([]);
  loading = signal(true);
  error = signal('');

  // Filtri selezionati dall'utente
  selectedSegment = signal('');
  selectedYear = signal(0);

  segments = ['Agricoltura', 'Allevamento', 'Pesca', 'Silvicoltura'];

  // Ricalcola la lista filtrata ogni volta che cambia un filtro o i dati
  filteredCompanies = computed(() => {
    let result = this.companies();
    const segment = this.selectedSegment();
    const year = this.selectedYear();

    if (segment) {
      result = result.filter(c => c.segment === segment);
    }

    // Filtra per anno: mostra solo le aziende che hanno report per quell'anno
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

  // Carica aziende, report e anni disponibili in parallelo
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
