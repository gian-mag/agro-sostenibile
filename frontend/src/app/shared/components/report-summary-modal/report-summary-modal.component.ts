import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-report-summary-modal',
  standalone: true,
  templateUrl: './report-summary-modal.component.html',
  styleUrl: './report-summary-modal.component.scss'
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
