import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Report, ApiResponse } from '../models';
import { environment } from '../../../environments/environment';

// Parametri opzionali per filtrare i report
export interface ReportFilters {
  companyId?: number;
  year?: number;
  segment?: string;
  tag?: string;
  sort?: string;
}

// Servizio per gestire report di sostenibilita (lettura, download, summary)
@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/reports`;

  // Recupera tutti i report, con filtri opzionali passati come query params
  getAll(filters?: ReportFilters): Observable<Report[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.companyId) params = params.set('companyId', filters.companyId.toString());
      if (filters.year) params = params.set('year', filters.year.toString());
      if (filters.segment) params = params.set('segment', filters.segment);
      if (filters.tag) params = params.set('tag', filters.tag);
      if (filters.sort) params = params.set('sort', filters.sort);
    }
    return this.http.get<ApiResponse<Report[]>>(this.baseUrl, { params }).pipe(
      map(res => res.data)
    );
  }

  getById(id: number): Observable<Report> {
    return this.http.get<ApiResponse<Report>>(`${this.baseUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }

  // Scarica il PDF come blob binario
  downloadPdf(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/download`, {
      responseType: 'blob'
    });
  }

  // Richiede il resoconto testuale del report
  getSummary(id: number): Observable<string> {
    return this.http.get<ApiResponse<string>>(`${this.baseUrl}/${id}/summary`).pipe(
      map(res => res.data)
    );
  }

  // Anni per cui esistono report (per popolare i filtri)
  getAvailableYears(): Observable<number[]> {
    return this.http.get<ApiResponse<number[]>>(`${this.baseUrl}/years`).pipe(
      map(res => res.data)
    );
  }

  // Crea un link temporaneo e forza il download nel browser
  triggerDownload(blob: Blob, fileName: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  }
}
