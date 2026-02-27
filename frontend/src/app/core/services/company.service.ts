import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Company, Report, ApiResponse } from '../models';
import { environment } from '../../../environments/environment';

// Servizio per le operazioni CRUD sulle aziende
@Injectable({ providedIn: 'root' })
export class CompanyService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/companies`;

  getAll(): Observable<Company[]> {
    return this.http.get<ApiResponse<Company[]>>(this.baseUrl).pipe(
      map(res => res.data)
    );
  }

  getById(id: number): Observable<Company> {
    return this.http.get<ApiResponse<Company>>(`${this.baseUrl}/${id}`).pipe(
      map(res => res.data)
    );
  }

  // Recupera i report associati a una specifica azienda
  getReports(companyId: number): Observable<Report[]> {
    return this.http.get<ApiResponse<Report[]>>(`${this.baseUrl}/${companyId}/reports`).pipe(
      map(res => res.data)
    );
  }
}
